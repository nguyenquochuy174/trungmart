import classNames from 'classnames/bind';
import Header from '~/layouts/components/User/Header/Header';
import styles from './SidebarMessageLayout.module.scss';
import SidebarMessage from './SidebarMessage/SidebarMessage';
import Footer from '~/layouts/components/Footer/Footer';

const cx = classNames.bind(styles);

function SidebarMessageLayout({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <SidebarMessage />
                <div className={cx('main')}>{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default SidebarMessageLayout;
