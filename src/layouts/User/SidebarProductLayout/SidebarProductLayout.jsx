import classNames from 'classnames/bind';
import Header from '~/layouts/components/User/Header/Header';
import SidebarProduct from './SidebarProduct/SidebarProduct';
import styles from './SidebarMessageProduct.module.scss';
import Footer from '~/layouts/components/Footer/Footer';

const cx = classNames.bind(styles);
function SidebarProductLayout({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <SidebarProduct />
                <div className={cx('main')}>{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default SidebarProductLayout;
