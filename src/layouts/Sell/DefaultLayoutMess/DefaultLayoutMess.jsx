import classNames from 'classnames/bind';
import styles from './DefaultLayoutMess.module.scss';
import Header from '~/layouts/components/Sell/Header/Header';
import SliderBarMess from './SliderBar/SliderBarMess';
import Footer from '~/layouts/components/Footer/Footer';
import { listMenuSell } from '~/constant/mock-data';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function DefaultLayoutMess({ children }) {
       const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
    const [showSidebar, setShowSidebar] = useState(true);
    const location = useLocation();
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 576;
            setIsMobile(mobile);
            if (!mobile) {
                setShowSidebar(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        if (isMobile && location.pathname !== '/MessageSell') {
            setShowSidebar(false);
        }
    }, [location.pathname, isMobile]);

    const handleBackToList = () => {
        setShowSidebar(true);
        window.history.pushState({}, '', '/MessageSell');
    };

    return (
        <div className={cx('container')}>
            <Header />
            <div className={cx('wrapper')}>
                {(!isMobile || showSidebar) && (
                    <SliderBarMess className={cx('sidebar')} />
                )}
                {(!isMobile || !showSidebar) && (
                    <div className={cx('main')}>
                        {isMobile && !showSidebar && (
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                onClick={handleBackToList}
                                className={cx('icon-back')}
                            />
                        )}
                       {children}
                    </div>
                )}
            </div>
            <Footer data={listMenuSell} />
        </div>
    );
}

export default DefaultLayoutMess;
