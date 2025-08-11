import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { listMenuUser } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleUp,
    faEnvelope,
    faLocationDot,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook,
    faFacebookMessenger,
    faSquareInstagram,
} from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);
function Footer({ data }) {
    function handleScrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <>
            <div className={cx('footer')}>
                <div className={cx('backToTop')} onClick={handleScrollToTop}>
                    <p>Quay lại đầu trang</p>
                    <FontAwesomeIcon
                        icon={faAngleUp}
                        className={cx('iconAngleUp')}
                    />
                </div>
                <div className={cx('main')}>
                    <div className={cx('footerInfo')}>
                        <ul>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    <p>Trường Đại học Khoa học Huế</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <p>trungmart75@gmail.com</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faPhone} />
                                    <p>0367376403</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('footerMenu')}>
                        <ul>
                            {data.map((menu, index) => (
                                <li key={index}>
                                    <a href={menu.path}>{menu.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={cx('footerRequire')}>
                        <ul>
                            <li>
                                <a href="#">Chính sách giao hàng</a>
                            </li>
                            <li>
                                <a href="#">Điều khoản và điều kiện sử dụng</a>
                            </li>
                            <li>
                                <a href="#">Chính sách bảo mật</a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('footerSocial')}>
                        <ul>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faSquareInstagram} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon
                                        icon={faFacebookMessenger}
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('endFooter')}>
                    <p>© 2025 - Bản quyền thuộc về TrungMart</p>
                </div>
            </div>
        </>
    );
}

export default Footer;
