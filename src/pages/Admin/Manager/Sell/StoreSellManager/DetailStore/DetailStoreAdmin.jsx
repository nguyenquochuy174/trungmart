import classNames from 'classnames/bind';
import styles from './DetailStoreAdmin.module.scss';
import { Link, useParams } from 'react-router-dom';
import { storeList,listinfoSell} from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
     faGlobe,
    faHouse,
    faMobile,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';

import StoreView from '~/components/StoreView/StoreView';

const cx = classNames.bind(styles);
function DetailStoreAdmin() {
       const { id } = useParams();
         const store = storeList.find(
        (store) => store.id === Number(id),
       
    );
     const info=listinfoSell.find((item)=>item.idstore===Number(store.id))
     const check = store.status==='cancelled'?true:false;
    return (
     <>
            <h4>Thông tin chủ cửa hàng</h4>
            <StoreView
                data={store}
                report={false}
                 form ={false}
                 check={check}
            />

            <div className={cx('menu-store')}>
                <Link
                    to={`/StoreAdmin/${id}`}
                    className={cx('menu-link')}
                >
                   Thông Tin Cửa Hàng
                </Link>
                <Link
                    to={`/ProductAdmin/${id}`}
                    className={cx('menu-link')}
                >
                    Sản phẩm
                </Link>
                  <Link
                    to={`/DetailStoreAdmin/${id}`}
                    className={cx('menu-link', 'active')}
                >
                    Thông Tin Chủ Cửa Hàng
                </Link>
            </div>
            <div className={cx('container')}>
                        {info && (
                            <div >
                                {/* Thông tin hồ sơ */}
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
                        )}
                    </div>
            </>
    );
}

export default DetailStoreAdmin;