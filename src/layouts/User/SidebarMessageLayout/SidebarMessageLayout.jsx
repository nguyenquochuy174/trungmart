import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '~/layouts/components/User/Header/Header';
import styles from './SidebarMessageLayout.module.scss';
import SidebarMessage from './SidebarMessage/SidebarMessage';
import Footer from '~/layouts/components/Footer/Footer';
import { listMenuUser } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AIChatBox from '~/components/AIChatBox/AIChatBox';

const cx = classNames.bind(styles);

function SidebarMessageLayout({ children }) {
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
        if (isMobile && location.pathname !== '/UserMessage') {
            setShowSidebar(false);
        }
    }, [location.pathname, isMobile]);

    const handleBackToList = () => {
        setShowSidebar(true);
        window.history.pushState({}, '', '/UserMessage');
    };

    return (
        <div className={cx('container')}>
            <Header />
            <div className={cx('wrapper')}>
                {(!isMobile || showSidebar) && (
                    <SidebarMessage className={cx('sidebar')} />
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
            <Footer data={listMenuUser} />
            <AIChatBox />
        </div>
    );
}

export default SidebarMessageLayout;
