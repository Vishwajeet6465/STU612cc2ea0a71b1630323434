import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Manage Category',
    url: '/category',
    iconComponent: { name: 'cil-layers' }
  },
  {
    name: 'Manage Product',
    url: '/product',
    iconComponent: { name: 'cil-basket' }
  },
  {
    name: 'Manage Order',
    url: '/order',
    iconComponent: { name: 'cil-tags' }
  },
  {
    name: 'View Bills',
    url: '/bills',
    iconComponent: { name: 'cil-notes' }
  },
];
