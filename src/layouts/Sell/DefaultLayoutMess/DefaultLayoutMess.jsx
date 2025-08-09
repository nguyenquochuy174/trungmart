import classNames from 'classnames/bind';
import styles from './DefaultLayoutMess.module.scss';
import Header from '~/layouts/components/Sell/Header/Header';
import SliderBarMess from './SliderBar/SliderBarMess';
import Footer from '~/layouts/components/Footer/Footer';
import { listMenuSell } from '~/constant/mock-data';
const cx = classNames.bind(styles);
function DefaultLayoutMess({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <SliderBarMess />
                <div>{children}</div>
            </div>

            <Footer data={listMenuSell} />
        </>
    );
}

export default DefaultLayoutMess;
