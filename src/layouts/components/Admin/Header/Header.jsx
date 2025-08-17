import { Menu } from '~/components/Menu/Menu';
import { listMenuAdmin } from '~/constant/mock-data';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    
} from '@fortawesome/free-brands-svg-icons';
import {
    faBell,
    faSearch,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/image';
const cx = classNames.bind(styles);
function Header() {
    return (
        <>
           <div className={cx('container')}>
            <div className={cx('headerTop')}>
                <div className={cx('infoHeader')}>
                    <FontAwesomeIcon
                    icon={faFacebook}
                    className={cx('iconFace')}
                    />
                    <p>For any queries - please contact customer
                            care-0367376403
                    </p>
                </div>
            </div>

            <div className={cx('headerBottom')}>
                <div className={cx('headerContent')}>
                    <div className={cx('logo')}>
                        <img src={images.logo} alt="TrungMart"/>
                    </div>
                    <div className={cx('formSearch')}>
                        <input
                            type='text'
                            placeholder='Nhập vào đây để tìm kiếm'
                        />
                        <FontAwesomeIcon
                        icon={faSearch}
                        className={cx('iconSearch')}
                        />
                    </div>
                    <div className={cx('menuIconHeader')}>
                        <ul>
                            <li>
                                <a href="/NotificationAdmin">
                                    <FontAwesomeIcon
                                        icon={faBell}/>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <FontAwesomeIcon
                                        icon={faArrowRightFromBracket}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

           </div>
            <Menu data={listMenuAdmin} />
        </>
    );
}

export default Header;
