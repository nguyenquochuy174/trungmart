import classNames from 'classnames/bind';
import styles from './StoreAdmin.module.scss';
import { Link, useParams } from 'react-router-dom';
import { storeList} from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
     faGlobe,
    faHouse,
    faMobile,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';

import StoreView from '~/components/StoreView/StoreView';

const cx = classNames.bind(styles);
function StoreAdmin() {
  
    const { id } = useParams();
         const store = storeList.find(
        (store) => store.id === Number(id),
    );
    const check = store.status==='cancelled'?true:false;
    return (
        <>
            <h4 className={cx('tieude')}>Thông tin cửa hàng</h4>
            <StoreView
                data={store}
                report={false}
                 form ={false}
                 check ={check}
            />

            <div className={cx('menu-store')}>
                <Link
                    to={`/StoreAdmin/${id}`}
                    className={cx('menu-link', 'active')}
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
                    className={cx('menu-link')}
                >
                    Thông Tin Chủ Cửa Hàng
                </Link>
            </div>
            <div className={cx('info-shop')}>
                <p className={cx('description')}>{store.description}</p>
                <p className={cx('info-title')}>
                    Sản phẩm nổi bật tại {store.name}
                </p>
                <ul>
                    {store.featuredProducts.map((content, index) => (
                        <li key={index}>{content}</li>
                    ))}
                </ul>
                <p className={cx('info-title')}>Tại sao chọn {store.name} ?</p>
                <ul>
                    {store.guarantee.map((content, index) => (
                        <li key={index}>{content}</li>
                    ))}
                </ul>
                <p className={cx('info-title')}>Thông tin liên hệ</p>
                <ul>
                    <li className={cx('contact')}>
                        <FontAwesomeIcon icon={faHouse} /> Địa chỉ:
                        {store.address}
                    </li>
                    <li className={cx('contact')}>
                        <FontAwesomeIcon icon={faPhone} /> Số điện thoại:
                        {store.phone}
                    </li>
                    <li className={cx('contact')}>
                        <FontAwesomeIcon icon={faGlobe} /> Website:
                        <Link> {store.website}</Link>
                    </li>
                    <li className={cx('contact')}>
                        <FontAwesomeIcon icon={faMobile} /> Fanpage:
                        <Link> {store.fanpage}</Link>
                    </li>
                </ul>
                <p className={cx('info-title')}>Giấy chứng nhận</p>
                <ul className={cx('cert')}>
                    {store.certifications.map((item, index) => (
                        <li key={index}>
                            <img key={index} src={item.url} alt={item.alt} />
                        </li>
                    ))}
                </ul>
            </div>


        </>
    );
}

export default StoreAdmin;