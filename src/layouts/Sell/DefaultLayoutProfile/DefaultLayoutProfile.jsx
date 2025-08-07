import classNames from 'classnames/bind';
import styles from './DefaultLayoutProfile.module.scss'
import Header from '~/layouts/components/Sell/Header/Header';
import SliderBar from './SliderBarProfile/SliderBar';
import Footer from '~/layouts/components/Footer/Footer';
const cx=classNames.bind(styles)
function DefaultLayoutProfile({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <SliderBar/>
                 <div>{children}</div>
            </div>
        
            <Footer/>
        </>
    );
}

export default DefaultLayoutProfile;
