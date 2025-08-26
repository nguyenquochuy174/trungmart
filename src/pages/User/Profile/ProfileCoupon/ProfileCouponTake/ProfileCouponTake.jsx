import classNames from 'classnames/bind';
import styles from './ProfileCouponTake.module.scss';
import { Link } from 'react-router-dom';
import { listCoupons } from '~/constant/mock-data';
import ItemCoupon from '~/components/ItemCoupon/ItemCoupon';

const cx = classNames.bind(styles);
function ProfileCouponTake() {
    return (
        <div className={cx('container')}>
            <div className={cx('menuCoupon')}>
                <Link to={`/UserProfileCoupon`} className={cx('menu-link')}>
                    Mã Giảm Của Tôi
                </Link>
                <Link
                    to={`/UserProfileCouponTake`}
                    className={cx('menu-link', 'active')}
                >
                    Lấy Mã Giảm
                </Link>
            </div>
            <div className={cx('listCoupon')}>
                {listCoupons.map((item) => (
                    <ItemCoupon data={item} key={item.id} />
                ))}
            </div>
        </div>
    );
}

export default ProfileCouponTake;
