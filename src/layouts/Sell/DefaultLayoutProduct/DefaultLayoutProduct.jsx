import classNames from 'classnames/bind';
import styles from './DefaultLayoutProduct.module.scss'
import Header from '~/layouts/components/Sell/Header/Header';
import SliderBarProduct from './SliderBar/SliderBarProduct';
import Footer from '~/layouts/components/Footer/Footer';
const cx=classNames.bind(styles)
function DefaultLayoutProduct({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <SliderBarProduct/>
            <div>{children}</div>
            </div>
            
            <Footer/>
        </>
    );
}

export default DefaultLayoutProduct;
