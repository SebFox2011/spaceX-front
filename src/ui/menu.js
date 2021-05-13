module.exports = [
  {
    key: 'home',
    name: 'Home',
    icon: 'home',
    link:'/',
    child: [
      {
        key: 'corporate',
        name: 'Corporate',
        link: '/Capsules',
        icon: 'business',
        badge: 'Hot'
      }
    ]
  },
  {
    key: 'missions',
    name: 'Les missions',
    icon: 'widgets',
    link:'/Capsules',
    child: [
      {
        key: 'static_apps',
        name: 'Static Apps',
        title: true,
      }
    ]
  },
  {
    key: 'pages',
    name: 'Pages',
    icon: 'important_devices',
    child: [
      {
        key: 'static_auth',
        name: 'Static Auth',
        title: true,
      }
    ]
  },
  {
    key: 'tables',
    name: 'Tables Charts',
    icon: 'table_chart',
    child: [
      {
        key: 'common_table',
        name: 'Common Table',
        title: true,
      }
    ]
  },
  {
    key: 'forms',
    name: 'Form Button',
    icon: 'border_color',
    child: [
      {
        key: 'buttons_collection',
        name: 'Button Collection',
        title: true,
      },
      {
        key: 'buttons',
        name: 'Buttons',
        icon: 'add_circle',
        link: '/app/forms/buttons'
      }
    ]
  },
];
