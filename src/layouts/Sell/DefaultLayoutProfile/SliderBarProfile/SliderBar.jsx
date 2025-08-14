import { listSliderBarSell } from '~/constant/mock-data';
import classNames from 'classnames/bind';
import styles from './SliderBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  
} from '@fortawesome/free-brands-svg-icons';
import {
    faClipboardCheck,
    faWallet,
    faShop,
    faChartSimple,
    faKey,
    faUser,
    faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/image';

const cx = classNames.bind(styles);

function SliderBar() {
    return (
        <>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('infoUser')}>
                        <div className={cx('avatar')}>
                            <img src={images.avatar} alt="" />
                        </div>
                        <div className={cx('Name')}>
                            <div className={cx('userName')}>
                                Huy
                            </div>
                            <div className={cx('userEmail')}>
                                Huy1704@gmail.com
                            </div>
                        </div>
                    </div>
                    <div className={cx('Action')}>
                         <div className={cx('actionContent')}>
                            <a href="/ProfileSell">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className={cx('iconProfile')}
                                />
                                <p>Hồ sơ của tôi</p>
                            </a>
                         </div>
                         <div className={cx('actionContent')}>
                            <a href="/StoreSell">
                                <FontAwesomeIcon
                                    icon={faShop}
                                    className={cx('iconProfile')}

                                />
                                <p>Cửa hàng của tôi</p>
                            </a>
                         </div>
                         <div className={cx('actionContent')}>
                            <a href="/PasswordSell">
                                <FontAwesomeIcon
                                    icon={faKey}
                                    className={cx('iconProfile')}

                                />
                                <p>Đổi mật khẩu</p>
                            </a>
                         </div>
                         <div className={cx('actionContent')}>
                            <a href="/StatisticSell">
                                <FontAwesomeIcon
                                    icon={faChartSimple}
                                    className={cx('iconProfile')}

                                />
                                <p>Thống Kê</p>
                            </a>
                         </div>
                          <div className={cx('actionContent')}>
                            <a href="/OrderSell">
                                <FontAwesomeIcon
                                    icon={faClipboardCheck}
                                    className={cx('iconProfile')}

                                />
                                <p>Duyệt đơn hàng</p>
                            </a>
                         </div>
                           <div className={cx('actionContent')}>
                            <a href="/WalletSell">
                                <FontAwesomeIcon
                                    icon={faWallet}
                                    className={cx('iconProfile')}

                                />
                                <p>Ví</p>
                            </a>
                         </div>
                        <div className={cx('actionContent')}>
                            <a href="/">
                                <FontAwesomeIcon
                                    icon={faArrowRightFromBracket}
                                    className={cx('iconProfile')}

                                />
                                <p>Đăng xuất</p>
                            </a>
                         </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SliderBar;
