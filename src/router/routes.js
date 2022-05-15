import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Detail from "@/pages/Deatil"
import Search from "@/pages/Search"
import Register from "@/pages/Register"


export default [{
    path: '/',
    redirect: '/home'
  },
  {
    'path': '/home',
    component: Home,
  },
  {
    'path': '/Login',
    component: Login,
    meta: {
      isShowFooter: true
    }
  },
  {
    'path': '/register',
    component: Register,
    meta: {
      isShowFooter: true
    }
  },
  {
    'path': '/search',
    component: Search,

  },
  {
    'path': '/detail',
    component: Detail,

  }
]