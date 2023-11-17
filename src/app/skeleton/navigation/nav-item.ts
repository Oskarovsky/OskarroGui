export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    displayName: 'Strona główna',
    iconName: 'slideshow',
    route: '',
  },
  {
    displayName: 'Utwory',
    iconName: 'slideshow',
    route: '',
    children: [
      {
        displayName: 'Vixa',
        iconName: 'slideshow',
        route: '/tracks/vixa',
      },
      {
        displayName: 'Club',
        iconName: 'slideshow',
        route: '/tracks/club',
      },
      {
        displayName: 'Dance',
        iconName: 'slideshow',
        route: '/tracks/dance',
      },
      {
        displayName: 'Retro',
        iconName: 'slideshow',
        route: '/tracks/retro',
      },
      {
        displayName: 'Techno',
        iconName: 'slideshow',
        route: '/tracks/techno',
      },
      {
        displayName: 'Disco',
        iconName: 'slideshow',
        route: '/tracks/Disco',
      },
    ]
  },
  {
    displayName: 'Top ranking',
    iconName: 'slideshow',
    route: '',
    children: [
      {
        displayName: 'Vixa',
        iconName: 'slideshow',
        route: '/tracks/vixa',
      },
      {
        displayName: 'Club',
        iconName: 'slideshow',
        route: '/tracks/club',
      },
      {
        displayName: 'Dance',
        iconName: 'slideshow',
        route: '/tracks/dance',
      },
      {
        displayName: 'Retro',
        iconName: 'slideshow',
        route: '/tracks/retro',
      },
      {
        displayName: 'House',
        iconName: 'slideshow',
        route: '/tracks/house',
      },
      {
        displayName: 'Techno',
        iconName: 'slideshow',
        route: '/tracks/techno',
      }
    ]
  },
  {
    displayName: 'Video',
    iconName: 'slideshow',
    route: '',
    children: [
      {
        displayName: 'Mixy',
        iconName: 'slideshow',
        route: '/video/category/MIX',
      },
      {
        displayName: 'Luna Mix',
        iconName: 'slideshow',
        route: '/video/category/LUNA_MIX',
      },
      {
        displayName: 'Psychopath',
        iconName: 'slideshow',
        route: '/video/category/PSYCHO_PATH',
      },
      {
        displayName: 'Retro',
        iconName: 'slideshow',
        route: '/video/category/RETRO',
      }
    ]
  }
];
