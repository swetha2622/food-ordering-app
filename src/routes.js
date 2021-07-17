// import App from './App';
import Menu from './components/Layout/Content/Menu/Menu';
import Cart from './components/Layout/Content/Cart/Cart';
import Content from './components/Layout/Content/Content';

const routes = [
    {
      path: "/menu",
      component: Menu
    },
    {
        path: "/cart",
        component: Cart
    },
    // {
    //   path: "/user",
    //   component: User,
    //   routes: [
    //     {
    //       path: "/content/menu",
    //       component: Menu
    //     },
    //     {
    //       path: "/content/cart",
    //       component: Cart
    //     }
    //   ]
    // },
    // {
    //     path: "/admin",
    //     component: Admin,
    //     routes: [
    //       {
    //         path: "/admin/orders",
    //         component: Orders
    //       },
    //       {
    //         path: "/admin/menu",
    //         component: Menu
    //       }
    //     ]
    //   }
     {
      path: "/",
      component: Content
    },
  ];

  export default routes;