import classNames from 'classnames/bind';
import Header from '~/layouts/components/User/Header/Header';
import SidebarProfile from './SidebarProfile/SidebarProfile';
import styles from './SidebarMessageProfile.module.scss';
import Footer from '~/layouts/components/Footer/Footer';
import { listMenuUser } from '~/constant/mock-data';

const cx = classNames.bind(styles);

function SidebarProfileLayout({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <SidebarProfile />
                <div className={cx('main')}>{children}</div>
            </div>
            <Footer data={listMenuUser} />
        </>
    );
}

export default SidebarProfileLayout;
