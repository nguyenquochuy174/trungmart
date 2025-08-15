import classNames from 'classnames/bind';
import styles from './DefaultLayoutUser.module.scss';
import { listMenuUser } from '~/constant/mock-data';
import Footer from '~/layouts/components/Footer/Footer';
import Header from '~/layouts/components/User/Header/Header';
const cx = classNames.bind(styles);
function DefaultLayoutUser({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
            <Footer data={listMenuUser} />
        </div>
    );
}

export default DefaultLayoutUser;
