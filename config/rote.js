// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user',
          routes: [
            {
              name: 'login',
              path: '/user/login',
              component: './user/Login',
            },
          ],
        },
      ],
    },
  
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: 'smile',
      component: './Dashboard',
    },

  
  ];
  