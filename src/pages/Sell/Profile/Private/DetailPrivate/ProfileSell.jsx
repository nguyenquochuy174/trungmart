import styles from "./Profile.module.scss";
import classNames from 'classnames/bind';
import { listinfoSell } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useState,useEffect} from 'react';
const cx = classNames.bind(styles);

function ProfileSell() {
     const [info, setInfo] = useState([]);
    const idsell = parseInt(localStorage.getItem('idSell'))

       useEffect(() => {
  const filteredInfo = listinfoSell.filter(
    (msg) => parseInt(msg.id) === idsell
  );
  setInfo(filteredInfo);
}, [idsell]);
    return (
        <div className={cx('container')}>
            {info.map(info => (
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
                                <p>{info.Name}</p>
                            </div>
                            <div className={cx('Name')}>
                                <p>Họ Đệm</p>
                                <p>{info.LastName}</p>
                            </div>
                        </div>
                        <div className={cx('NameSell')}>
                            <div className={cx('Name')}>
                                <p>Ngày Sinh</p>
                                <p>{info.Date}</p>
                            </div>
                            <div className={cx('Name')}>
                                <p>Giới Tính</p>
                                <p>{info.Gender}</p>
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
                                <p>{info.Email}</p>
                            </div>
                            <div className={cx('Name')}>
                                <p>Điện Thoại</p>
                                <p>{info.Phone}</p>
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
                            <p>{info.Facebook}</p>
                        </div>
                        <div className={cx('Name')}>
                            <p>TikTok</p>
                            <p>{info.Tiktok}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProfileSell;
