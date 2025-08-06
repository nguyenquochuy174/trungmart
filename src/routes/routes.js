import LoginLayout from '~/layouts/LoginLayout/LoginLayout';
import SidebarMessageLayout from '~/layouts/User/SidebarMessageLayout/SidebarMessageLayout';
import SidebarProductLayout from '~/layouts/User/SidebarProductLayout/SidebarProductLayout';
import SidebarProfileLayout from '~/layouts/User/SidebarProfileLayout/SidebarProfileLayout';
import Introduce from '~/pages/Introduce/Introduce';
import Login from '~/pages/Login/Login';
import DetailProduct from '~/pages/User/DetailProduct/DetailProduct';

import Home from '~/pages/User/Home/Home';
import Message from '~/pages/User/Message/Message';
import Notification from '~/pages/User/Notification/Notification';
import Payment from '~/pages/User/Payment/Payment';
import Product from '~/pages/User/Product/Product';
import ProfileAddress from '~/pages/User/Profile/ProfileAddress/ProfileAddress';
import ProfileFavoriteProduct from '~/pages/User/Profile/ProfileFavoriteProduct/ProfileFavoriteProduct';
import ProfileFavoriteShop from '~/pages/User/Profile/ProfileFavoriteShop/ProfileFavoriteShop';
import ProfileInfo from '~/pages/User/Profile/ProfileInfo/ProfileInfo';
import ProfileOrder from '~/pages/User/Profile/ProfileOrder/ProfileOrder';
import ProfilePassword from '~/pages/User/Profile/ProfilePassword/ProfilePassword';
import ShoppingCart from '~/pages/User/ShoppingCart/ShoppingCart';
import InfoShop from '~/pages/User/ViewShop/InfoShop/InfoShop';
import ProductShop from '~/pages/User/ViewShop/ProductShop/ProductShop';
// không cần đăng nhập vẫn xem được
const publicRoutes = [
    // user
    { path: '/', component: Login, layout: LoginLayout },
    { path: '/UserHome', component: Home },
    { path: '/UserIntroduce', component: Introduce },
    { path: '/UserNotification', component: Notification },
    { path: '/UserDetailProduct', component: DetailProduct },
    { path: '/UserShoppingCart', component: ShoppingCart },
    { path: '/UserPayment', component: Payment },
    { path: '/UserInfoShop', component: InfoShop },
    { path: '/UserProductShop', component: ProductShop },
    { path: '/UserMessage', component: Message, layout: SidebarMessageLayout },
    { path: '/UserProduct', component: Product, layout: SidebarProductLayout },

    // user profile
    {
        path: '/UserProfileAddress',
        component: ProfileAddress,
        layout: SidebarProfileLayout,
    },
    {
        path: '/UserProfileFavoriteProduct',
        component: ProfileFavoriteProduct,
        layout: SidebarProfileLayout,
    },
    {
        path: '/UserProfileFavoriteShop',
        component: ProfileFavoriteShop,
        layout: SidebarProfileLayout,
    },
    {
        path: '/UserProfilePassword',
        component: ProfilePassword,
        layout: SidebarProfileLayout,
    },
    {
        path: '/UserProfileInfo',
        component: ProfileInfo,
        layout: SidebarProfileLayout,
    },
    {
        path: '/UserProfileOrder',
        component: ProfileOrder,
        layout: SidebarProfileLayout,
    },
];
// cần phải đăng nhập mới xem được
const privateRoutes = {};
export { publicRoutes, privateRoutes };
