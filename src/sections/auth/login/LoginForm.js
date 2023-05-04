import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  function setErrors() {
    setError(true)
    setTimeout(() => {
      setError(false)
    }, 5000); // Set the timeout for 5 seconds
  }

  const handleClick = async () => {
    try {
      setLoading(true);
      const value = {
        email,
        password,
      };
      const {data} = await axios.post('/v1/auth/admin-login', value);
      if (data.user) {
        localStorage.setItem("accessToken", data.accessToken );
        localStorage.setItem("refreshToken", data.refreshToken );
        localStorage.setItem("user", data.user._id );
        navigate('/dashboard', { replace: true });
      } else {
        setMessage(data.data.message);
        setError()
      }
    } catch (error) {
      setMessage(error.response.data.message || 'Somthing went wrong');
      setErrors()
      setLoading(false);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          type="email"
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton
        loading={loading}
        sx={{ mt: 5, mb:2 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Login
      </LoadingButton>

      {error && <Alert severity="error"> {message} </Alert>}
    </>
  );
}
