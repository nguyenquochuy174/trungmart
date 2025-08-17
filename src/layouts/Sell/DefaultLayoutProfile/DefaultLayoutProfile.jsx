import classNames from 'classnames/bind';
import styles from './DefaultLayoutProfile.module.scss';
import Header from '~/layouts/components/Sell/Header/Header';
import SliderBar from './SliderBarProfile/SliderBar';
import Footer from '~/layouts/components/Footer/Footer';
import { listMenuSell } from '~/constant/mock-data';
import { useState, useEffect } from 'react';
const cx = classNames.bind(styles);
function DefaultLayoutProfile({ children }) {
const [isMoblie,setisMobile]=useState(window.innerWidth<576)
useEffect(()=>{
    const handleResize = ()=>{
        setisMobile(window.innerWidth<576)
    }
    window.addEventListener("resize",handleResize)
    return ()=>window.removeEventListener("resize",handleResize)
})

    return (
        <>
            <Header />
            <div className={cx('container')}>
               {!isMoblie && <SliderBar/>}
                {children}
            </div>
            <Footer data={listMenuSell} />
        </>
    );
}

export default DefaultLayoutProfile;
