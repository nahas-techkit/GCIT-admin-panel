// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'event',
    path: '/dashboard/event',
    icon: icon('event'),
  },
  {
    title: 'Spekers',
    path: '/dashboard/spekers',
    icon: icon('ic_user'),
  },
  {
    title: 'Sponsers',
    path: '/dashboard/sponser',
    icon: icon('sponser'),
  },
  {
    title: 'Image',
    path: '/dashboard/images',
    icon: icon('ic_blog'),
  },
  {
    title: 'Videos',
    path: '/dashboard/video',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
