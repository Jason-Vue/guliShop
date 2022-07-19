import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Detail from "@/pages/Detail"
import Search from "@/pages/Search"
import Register from "@/pages/Register"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import Paysuccess from "@/pages/PaySuccess"

export default [{
  path: '/',
  redirect: '/home'
},
{
  'path': '/home',
  component: Home,
},
{
  'path': '/login',
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
  'path': '/search/:keyword?',
  component: Search,
  name: 'search'
},
{
  'path': '/detail/:skuid',
  component: Detail,
},
{
  'path': '/addCartSuccess',
  component: AddCartSuccess,
  name: 'addCartSuccess'
},
{
  'path': '/shopCart',
  component: ShopCart
},
{
  'path': "/trade",
  component: Trade
},
{
  'path': "/pay",
  component: Pay
},
{
  'path': "/paysuccess",
  component: Paysuccess
}
]