import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
// import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

import Event from './pages/Event/Index'
import EventForm from './components/events/CreateEvent'
import Spekers from './pages/Spekers/Index'
import CreateSpekers from './components/spekers/Create'
import Sponser from './pages/Sponser/Index'
import SponserForm from './components/sponsers/Create'
import Image from './pages/Gallery/Images'
import AddImage from './components/Gallery/DropImage'
import Video from './pages/Gallery/Video'
import AddVideo from './components/Gallery/AddVideo'

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { 
          path:'event',
          children:[
            {element:<Event/>, index:true},
            {path:'create', element:<EventForm/>},
            {path:'edit/:id', element:<EventForm/>},
          ]
         },

        
        { path: 'spekers', 
        children: [
          {element: <Spekers /> , index:true},
          {path:'create', element:<CreateSpekers/>},
          {path:'edit/:id', element:<CreateSpekers/>},
        ]
      
      },

      { path: 'sponser', 
        children: [
          {element: <Sponser /> , index:true},
          {path:'create', element:<SponserForm/>},
          {path:'edit/:id', element:<SponserForm/>}
        ]
      
      },

      { path: 'images', 
        children: [
          {element: <Image /> , index:true},
          {path:'create', element:<AddImage/>}
        ]
      
      },

      { path: 'video', 
      children: [
        {element: <Video /> , index:true},
        {path:'create', element:<AddVideo/>}
      ]
    
    },




        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
