import classNames from 'classnames/bind';
import styles from './InfoShop.module.scss';
import StoreView from '~/components/StoreView/StoreView';
import { useState } from 'react';
import FormApprove from '~/components/FormApprove/FormApprove';
import { reportForm, storeList } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGlobe,
    faHouse,
    faMobile,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function InfoShop() {
    const { shopId } = useParams();
    const [showReportForm, setShowReportForm] = useState(false);
    const store = storeList.find((item) => item.id === Number(shopId));
    return (
        <>
            <h4>Thông tin cửa hàng</h4>
            <StoreView
                data={store}
                report={true}
                onReportClick={() => setShowReportForm(true)}
            />

            <div className={cx('menu-store')}>
                <Link
                    to={`/UserInfoShop/${store.id}`}
                    className={cx('menu-link', 'active')}
                >
                    Thông tin
                </Link>
                <Link
                    to={`/UserProductShop/${store.id}`}
                    className={cx('menu-link')}
                >
                    Sản phẩm
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
                            <img src={item.url} alt={item.alt} />
                        </li>
                    ))}
                </ul>
            </div>

            {showReportForm && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalContent')}>
                        <FormApprove
                            data={reportForm[0]}
                            onClose={() => setShowReportForm(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default InfoShop;
