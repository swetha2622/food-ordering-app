// import App from './App';
import Menu from './components/Layout/Content/Menu/Menu';
import Cart from './components/Layout/Content/Cart/Cart';
import Content from './components/Layout/Content/Content';
import Login from './components/Layout/Content/Login/Login';
import Admin from './components/Layout/Content/admin/Admin'
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
     {
        path: "/login",
        component: Login,
        
      },
      {
        path: "/admin",
        component: Admin,
        
      },
     {
      path: "/",
      component: Content
    },
  ];

  export default routes;