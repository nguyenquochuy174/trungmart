import classNames from 'classnames/bind';
import styles from './DefaultLayoutProduct.module.scss';
import Header from '~/layouts/components/Sell/Header/Header';

import Footer from '~/layouts/components/Footer/Footer';
import { listMenuSell } from '~/constant/mock-data';
const cx = classNames.bind(styles);
function DefaultLayoutProduct({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <div>{children}</div>
            </div>

            <Footer data={listMenuSell} />
        </>
    );
}

export default DefaultLayoutProduct;
