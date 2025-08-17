import styles from "./Profile.module.scss";
import classNames from 'classnames/bind';
import { listinfoSell } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ProfileSell() {
    return (
        <div className={cx('container')}>
            {listinfoSell.map(info => (
                <div key={info.id}>
                    {/* Thông tin hồ sơ */}
                    <div className={cx('content')}>
                        <h3>Thông tin hồ sơ</h3>
                        <a href="/ProfileSellEdit">
                            <FontAwesomeIcon icon={faPen} className={cx('icon')} />
                            Chỉnh sửa
                        </a>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('NameSell')}>
                            <div className={cx('Name')}>
                                <p>Tên</p>
                                <b>{info.Name}</b>
                            </div>
                            <div className={cx('Name')}>
                                <p>Họ Đệm</p>
                                <b>{info.LastName}</b>
                            </div>
                        </div>
                        <div className={cx('NameSell')}>
                            <div className={cx('Name')}>
                                <p>Ngày Sinh</p>
                                <b>{info.Date}</b>
                            </div>
                            <div className={cx('Name')}>
                                <p>Giới Tính</p>
                                <b>{info.Gender}</b>
                            </div>
                        </div>
                    </div>

                    {/* Phương thức liên lạc */}
                    <div className={cx('content')}>
                        <h3>Phương Thức Liên Lạc</h3>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('NameSell')}>
                            <div className={cx('Name')}>
                                <p>Email</p>
                                <b>{info.Email}</b>
                            </div>
                            <div className={cx('Name')}>
                                <p>Điện Thoại</p>
                                <b>{info.Phone}</b>
                            </div>
                        </div>
                    </div>

                    {/* Thông tin khác */}
                    <div className={cx('content')}>
                        <h3>Thông tin khác</h3>
                    </div>
                    <div className={cx('NameSell')}>
                        <div className={cx('Name')}>
                            <p>Facebook</p>
                            <b>{info.Facebook}</b>
                        </div>
                        <div className={cx('Name')}>
                            <p>TikTok</p>
                            <b>{info.Tiktok}</b>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProfileSell;
