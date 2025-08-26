import classNames from 'classnames/bind';
import styles from './ProfileCouponUser.module.scss';
import { Link } from 'react-router-dom';
import { listCoupons, listFavorites } from '~/constant/mock-data';
import ItemCoupon from '~/components/ItemCoupon/ItemCoupon';

const cx = classNames.bind(styles);
function ProfileCouponUser() {
    const userId = Number(localStorage.getItem('userId'));
    const itemFavorite = listFavorites.find((item) => item.userId === userId);
    const listCouponFavorites = itemFavorite
        ? listCoupons.filter((coupon) =>
              itemFavorite.storeIds.includes(coupon.id),
          )
        : [];

    return (
        <div className={cx('container')}>
            <div className={cx('menuCoupon')}>
                <Link
                    to={`/UserProfileCoupon`}
                    className={cx('menu-link', 'active')}
                >
                    Mã Giảm Của Tôi
                </Link>
                <Link to={`/UserProfileCouponTake`} className={cx('menu-link')}>
                    Lấy Mã Giảm
                </Link>
            </div>
            <div className={cx('listCoupon')}>
                {listCouponFavorites.map((item) => (
                    <ItemCoupon user data={item} key={item.id} />
                ))}
            </div>
        </div>
    );
}

export default ProfileCouponUser;
