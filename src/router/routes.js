// import Home from "@/pages/Home"
// import Login from "@/pages/Login"
// import Detail from "@/pages/Detail"
// import Search from "@/pages/Search"
// import Register from "@/pages/Register"
// import AddCartSuccess from "@/pages/AddCartSuccess"
// import ShopCart from "@/pages/ShopCart"
// import Trade from "@/pages/Trade"
// import Pay from "@/pages/Pay"
// import Paysuccess from "@/pages/PaySuccess"
// import Center from "@/pages/Center"
// // 引入二级路由
// import GroupOrder from "@/pages/Center/GroupOrder";
// import MyOrder from "@/pages/Center/MyOrder";

const Home = () => import("@/pages/Home")
const Login = () => import("@/pages/Login")
const Detail = () => import("@/pages/Detail")
const Search = () => import("@/pages/Search")
const Register = () => import("@/pages/Register")
const AddCartSuccess = () => import("@/pages/AddCartSuccess")
const ShopCart = () => import("@/pages/ShopCart")
const Trade = () => import("@/pages/Trade")
const Pay = () => import("@/pages/Pay")
const PaySuccess = () => import("@/pages/PaySuccess")
const Center = () => import("@/pages/Center")
const GroupOrder = () => import("@/pages/Center/GroupOrder")
const MyOrder = () => import("@/pages/Center/MyOrder")

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
  component: Trade,
  // 路由独享守卫
  beforeEnter: (to, from, next) => {
    // 去交易页面，必须是从购物车来
    if (from.path == '/shopCart') {
      next()
    } else {
      // 从别的页面来，停留在当前
      next(false)
    }
  }
},
{
  'path': "/pay",
  component: Pay,
  beforeEnter: (to, from, next) => {
    if (from.path == '/trade') {
      next()
    } else {
      next(false)
    }
  }
},
{
  'path': "/paysuccess",
  component: PaySuccess
},
{
  'path': '/center',
  component: Center,
  children: [
    {
      'path': '/center',
      redirect: '/center/myOrder'
    },
    {
      'path': '/center/myOrder',
      component: MyOrder
    },
    {
      "path": '/center/groupOrder',
      component: GroupOrder
    }
  ]
}
]