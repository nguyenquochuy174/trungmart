import DefaultLayoutAdmin from '~/layouts/Admin/DefaultLayoutAdmin/DefaultLayoutAdmin';
import LoginLayout from '~/layouts/LoginLayout/LoginLayout';
import DefaultLayoutMess from '~/layouts/Sell/DefaultLayoutMess/DefaultLayoutMess';
import DefaultLayoutProduct from '~/layouts/Sell/DefaultLayoutProduct/DefaultLayoutProduct';
import DefaultLayoutProfile from '~/layouts/Sell/DefaultLayoutProfile/DefaultLayoutProfile';
import DefaultLayoutSell from '~/layouts/Sell/DefaultLayoutSell/DefaultLayoutSell';
import DefaultLayoutUser from '~/layouts/User/DefaultLayoutUser/DefaultLayoutUser';
import SidebarMessageLayout from '~/layouts/User/SidebarMessageLayout/SidebarMessageLayout';
import SidebarProfileLayout from '~/layouts/User/SidebarProfileLayout/SidebarProfileLayout';
import ManagerSell from '~/pages/Admin/Manager/Sell/ManagerSell';
import DetailProductAdmin from '~/pages/Admin/Manager/Sell/StoreSellManager/DetailProduct/DetailProductAdmin';
import DetailStoreAdmin from '~/pages/Admin/Manager/Sell/StoreSellManager/DetailStore/DetailStoreAdmin';
import ProductAdmin from '~/pages/Admin/Manager/Sell/StoreSellManager/Product/ProductAdmin';
import StoreAdmin from '~/pages/Admin/Manager/Sell/StoreSellManager/Store/StoreAdmin';
import ManagerUser from '~/pages/Admin/Manager/User/ManagerUser';
import NotificationAdmin from '~/pages/Admin/Notification/NotificationAdmin';
import StatisAdmin from '~/pages/Admin/Statis/StatisAdmin';
import Introduce from '~/pages/Introduce/Introduce';
import Login from '~/pages/Login/Login';
import MessageSell from '~/pages/Sell/Message/MessageSell';
import NotificationSell from '~/pages/Sell/Notification/NotificationSell';
import AddProduct from '~/pages/Sell/Product/AddProduct/AddProductSell';
import EditProductSell from '~/pages/Sell/Product/EditProduct/EditProductSell';
import ProductSell from '~/pages/Sell/Product/ProductSell/ProductSell';
import OrderSell from '~/pages/Sell/Profile/Oder/OrderSell';
import PasswordSell from '~/pages/Sell/Profile/Password/PasswordSell';
import ProfileSell from '~/pages/Sell/Profile/Private/DetailPrivate/ProfileSell';
import ProfileSellEdit from '~/pages/Sell/Profile/Private/EditPrivate/ProfileSellEdit';
import StatisticSell from '~/pages/Sell/Profile/Statistic/StatisticSell';
import StoreSell from '~/pages/Sell/Profile/Store/StoreSellDetail/StoreSell';
import StoreSellEdit from '~/pages/Sell/Profile/Store/StoreSellEdit/StoreSellEdit';
import WalletSell from '~/pages/Sell/Profile/Wallet/WalletSellDetail/WalletSell';
import WalletSellEdit from '~/pages/Sell/Profile/Wallet/WalletSellEdit/WalletSellEdit';
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
    { path: '/UserHome', component: Home, layout: DefaultLayoutUser },
    { path: '/UserIntroduce', component: Introduce, layout: DefaultLayoutUser },
    {
        path: '/UserNotification',
        component: Notification,
        layout: DefaultLayoutUser,
    },
    {
        path: '/UserDetailProduct/:id',
        component: DetailProduct,
        layout: DefaultLayoutUser,
    },
    {
        path: '/UserShoppingCart',
        component: ShoppingCart,
        layout: DefaultLayoutUser,
    },
    { path: '/UserPayment', component: Payment, layout: DefaultLayoutUser },
    { path: '/UserInfoShop', component: InfoShop, layout: DefaultLayoutUser },
    {
        path: '/UserProductShop',
        component: ProductShop,
        layout: DefaultLayoutUser,
    },
    { path: '/UserMessage', component: Message, layout: SidebarMessageLayout },
    { path: '/UserProduct', component: Product, layout: DefaultLayoutUser },

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

    //Admin

    {
        path: '/StatisAdmin',
        component: StatisAdmin,
        layout: DefaultLayoutAdmin,
    },
    { path: '/IntroduceSell', component: Introduce, layout: DefaultLayoutSell },
    {
        path: '/IntroduceAdmin',
        component: Introduce,
        layout: DefaultLayoutAdmin,
    },

    // sell
    { path: '/MessageSell', component: MessageSell, layout: DefaultLayoutMess },
    {
        path: '/NotificationSell',
        component: NotificationSell,
        layout: DefaultLayoutSell,
    },
    // product
    {
        path: '/ProductSell',
        component: ProductSell,
        layout: DefaultLayoutProduct,
    },
    {
        path: '/EditProductSell',
        component: EditProductSell,
        layout: DefaultLayoutSell,
    },
    {
        path: '/DetailProductSell',
        component: DetailProduct,
        layout: DefaultLayoutSell,
    },
    {
        path: '/AddProductSell',
        component: AddProduct,
        layout: DefaultLayoutSell,
    },
    //profile
    {
        path: '/ProfileSell',
        component: ProfileSell,
        layout: DefaultLayoutProfile,
    },
    {
        path: '/ProfileSellEdit',
        component: ProfileSellEdit,
        layout: DefaultLayoutProfile,
    },
    {
        path: '/StatisticSell',
        component: StatisticSell,
        layout: DefaultLayoutProfile,
    },
    { path: '/OrderSell', component: OrderSell, layout: DefaultLayoutProfile },
    {
        path: '/PasswordSell',
        component: PasswordSell,
        layout: DefaultLayoutProfile,
    },
    { path: '/StoreSell', component: StoreSell, layout: DefaultLayoutProfile },
    {
        path: '/StoreSellEdit',
        component: StoreSellEdit,
        layout: DefaultLayoutProfile,
    },
    {
        path: '/WalletSell',
        component: WalletSell,
        layout: DefaultLayoutProfile,
    },
    {
        path: '/WalletSellEdit',
        component: WalletSellEdit,
        layout: DefaultLayoutProfile,
    },

    //admin
    {
        path: '/StatisAdmin',
        component: StatisAdmin,
        layout: DefaultLayoutAdmin,
    },
    {
        path: '/NotificationAdmin',
        component: NotificationAdmin,
        layout: DefaultLayoutAdmin,
    },

    {
        path: '/ManagerUser',
        component: ManagerUser,
        layout: DefaultLayoutAdmin,
    },
    {
        path: '/ManagerSell',
        component: ManagerSell,
        layout: DefaultLayoutAdmin,
    },

    { path: '/StoreAdmin', component: StoreAdmin, layout: DefaultLayoutAdmin },
    {
        path: '/DetailStoreAdmin',
        component: DetailStoreAdmin,
        layout: DefaultLayoutAdmin,
    },
    {
        path: '/ProductAdmin',
        component: ProductAdmin,
        layout: DefaultLayoutAdmin,
    },
    {
        path: '/DetailProductAdmin',
        component: DetailProductAdmin,
        layout: DefaultLayoutAdmin,
    },
];
// cần phải đăng nhập mới xem được
const privateRoutes = {};
export { publicRoutes, privateRoutes };
