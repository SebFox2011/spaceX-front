module.exports = [
  {
    key: 'home',
    name: 'Infos',
    icon: 'home',
    link:'/',
  },
  {
    key: 'missions',
    name: 'Les missions',
    icon: 'widgets',
    link:'/MissionsTable',
    
  },
  {
    key: 'pages',
    name: 'Histoire',
    icon: 'important_devices',
    child: [
      {
        key: 'corporate',
        name: 'History',
        link: '/History',
        icon: 'business',
        badge: 'Hot'
      }
    ]
  },
  {
    key: 'tables',
    name: 'Ships',
    icon: 'table_chart',
    child: [
      {
        key: 'buttons',
        name: 'Ships',
        icon: 'add_circle',
        link: '/Ships'
      }
    ]
  },
  {
    key: 'forms',
    name: 'Dragons',
    icon: 'border_color',
    child: [
      {
        key: 'buttons',
        name: 'Dragons',
        icon: 'add_circle',
        link: '/Dragons'
      }
    ]
  },
];
