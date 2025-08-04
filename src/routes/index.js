import Home from '~/pages/User/Home';
import Message from '~/pages/User/Message';
// không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/message', component: Message },
];
// cần phải đăng nhập mới xem được
const privateRoutes = {};
export { publicRoutes, privateRoutes };
