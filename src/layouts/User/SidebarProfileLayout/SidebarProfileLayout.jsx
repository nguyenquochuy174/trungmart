import classNames from 'classnames/bind';
import Header from '~/layouts/components/User/Header/Header';
import SidebarProfile from './SidebarProfile/SidebarProfile';
import styles from './SidebarProfileLayout.module.scss';
import Footer from '~/layouts/components/Footer/Footer';
import { listMenuUser } from '~/constant/mock-data';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AIChatBox from '~/components/AIChatBox/AIChatBox';

const cx = classNames.bind(styles);

function SidebarProfileLayout({ children }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
    const [showSidebar, setShowSidebar] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
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
        if (isMobile) {
            if (location.pathname === '/UserProfileInfo') {
                setShowSidebar(true);
            } else {
                setShowSidebar(false);
            }
        }
    }, [location.pathname, isMobile]);

    const handleBackToList = () => {
        setShowSidebar(true);
        navigate('/UserProfileInfo');
    };
    return (
        <div className={cx('container')}>
            <Header />
            <div className={cx('wrapper')}>
                {(!isMobile || showSidebar) && (
                    <SidebarProfile
                        className={cx('sidebar')}
                        onLinkClick={() => setShowSidebar(false)}
                    />
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

export default SidebarProfileLayout;
