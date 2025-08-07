
import AdminLayouts from '~/layouts/Admin/DefaultLayout/DefaultLayout';
import SellLayout from '~/layouts/Sell/DefaultLayout/DefaultLayout';
import DetailProductAdmin from '~/pages/Admin/Manager/Sell/StoreSellManager/DetailProduct/DetailProductAdmin';
import DefaultLayoutMess from '~/layouts/Sell/DefaultLayoutMess/DefaultLayoutMess';
import DefaultLayoutProduct from '~/layouts/Sell/DefaultLayoutProduct/DefaultLayoutProduct';
import DefaultLayoutProfile from '~/layouts/Sell/DefaultLayoutProfile/DefaultLayoutProfile';

import Introduce from '~/pages/Introduce/Introduce'

// sell
import MessageSell from '~/pages/Sell/Message/MessageSell';
import NotificationSell from '~/pages/Sell/Notification/NotificationSell';

// product Sell
import ProductSell from '~/pages/Sell/Product/ProductSell/ProductSell';
import EditProductSell from '~/pages/Sell/Product/EditProduct/EditProductSell'
import DetailProductSell from '~/pages/Sell/Product/DetailProduct/DetailProductSell'
import AddProductSell from '~/pages/Sell/Product/AddProduct/AddProductSell'

// profile sell
import StatisticSell from '~/pages/Sell/Profile/Statistic/StatisticSell';
import OrderSell from '~/pages/Sell/Profile/Oder/OrderSell';
import PasswordSell from '~/pages/Sell/Profile/Password/PasswordSell';
import ProfileSell from '~/pages/Sell/Profile/Private/DetailPrivate/ProfileSell';
import ProfileSellEdit from '~/pages/Sell/Profile/Private/EditPrivate/ProfileSellEdit';
import StoreSell from '~/pages/Sell/Profile/Store/StoreSellDetail/StoreSell';
import StoreSellEdit from '~/pages/Sell/Profile/Store/StoreSellEdit/StoreSellEdit';
import WalletSell from '~/pages/Sell/Profile/Wallet/WalletSellDetail/WalletSell';
import WalletSellEdit from '~/pages/Sell/Profile/Wallet/WalletSellEdit/WalletSellEdit';

// Admin
import StatisAdmin from '~/pages/Admin/Statis/StatisAdmin';
import NotificationAdmin from '~/pages/Admin/Notification/NotificationAdmin';

// Manager
import ManagerUser from '~/pages/Admin/Manager/User/ManagerUser';
import ManagerSell from '~/pages/Admin/Manager/Sell/ManagerSell';

// detail sell
import StoreAdmin from '~/pages/Admin/Manager/Sell/StoreSellManager/Store/StoreAdmin';
import DetailStoreAdmin from '~/pages/Admin/Manager/Sell/StoreSellManager/DetailStore/DetailStoreAdmin';
import ProductAdmin from '~/pages/Admin/Manager/Sell/StoreSellManager/Product/ProductAdmin';



// không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: '/StatisAdmin', component: StatisAdmin },
    { path: '/IntroduceSell', component: Introduce,layout: SellLayout},
    { path: '/IntroduceAdmin', component: Introduce,layout: AdminLayouts},



    // sell
    { path: '/MessageSell', component: MessageSell,layout: DefaultLayoutMess },
    { path: '/NotificationSell', component: NotificationSell,layout: SellLayout},
    // product
    { path: '/ProductSell', component: ProductSell,layout:DefaultLayoutProduct },
    { path: '/EditProductSell', component: EditProductSell,layout: SellLayout},
    { path: '/DetailProductSell', component: DetailProductSell,layout: SellLayout},
    { path: '/AddProductSell', component: AddProductSell,layout: SellLayout},
    //profile
    { path: '/ProfileSell', component: ProfileSell,layout:DefaultLayoutProfile},
    { path: '/ProfileSellEdit', component: ProfileSellEdit,layout: DefaultLayoutProfile},
    { path: '/StatisticSell', component: StatisticSell,layout: DefaultLayoutProfile},
    { path: '/OrderSell', component: OrderSell,layout: DefaultLayoutProfile},
    { path: '/PasswordSell', component: PasswordSell,layout: DefaultLayoutProfile},
    { path: '/StoreSell', component: StoreSell,layout: DefaultLayoutProfile},
    { path: '/StoreSellEdit', component: StoreSellEdit,layout: DefaultLayoutProfile},
    { path: '/WalletSell', component: WalletSell,layout: DefaultLayoutProfile},
    { path: '/WalletSellEdit', component: WalletSellEdit,layout: DefaultLayoutProfile},

    //admin
    { path: '/StatisAdmin', component: StatisAdmin, layout: AdminLayouts},
    { path: '/NotificationAdmin', component: NotificationAdmin, layout: AdminLayouts},

    { path: '/ManagerUser', component: ManagerUser, layout: AdminLayouts},
    { path: '/ManagerSell', component: ManagerSell, layout: AdminLayouts},

    { path: '/StoreAdmin', component: StoreAdmin, layout: AdminLayouts},
    { path: '/DetailStoreAdmin', component: DetailStoreAdmin, layout: AdminLayouts},
    { path: '/ProductAdmin', component: ProductAdmin, layout: AdminLayouts},
    { path: '/DetailProductAdmin', component: DetailProductAdmin, layout: AdminLayouts},




];
// cần phải đăng nhập mới xem được
const privateRoutes = {};
export { publicRoutes, privateRoutes };
