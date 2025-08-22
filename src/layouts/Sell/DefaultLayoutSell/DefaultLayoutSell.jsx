import classNames from 'classnames/bind';
import styles from './DefaultLayoutSell.module.scss';
import { listMenuSell } from '~/constant/mock-data';
import Footer from '~/layouts/components/Footer/Footer';
import Header from '~/layouts/components/Sell/Header/Header';
const cx = classNames.bind(styles);
function DefaultLayoutSell({ children }) {
    return (
         <div className={cx('wrapper')}>
             <Header />
            <div className={cx('content')}>{children}</div>
            <Footer data={listMenuSell} />
         </div>
           
    );
}

export default DefaultLayoutSell;
