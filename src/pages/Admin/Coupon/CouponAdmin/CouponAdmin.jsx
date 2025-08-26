import classNames from 'classnames/bind';
import styles from './CouponAdmin.module.scss';
import ItemCoupon from '~/components/ItemCoupon/ItemCoupon';
import { listCoupons } from '~/constant/mock-data';
import Button from '~/components/Button/Button';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function CouponAdmin() {
    return (
        <div className={cx('container')}>
            <h2>Phiếu giảm giá</h2>
            <div className={cx('btnAddVoucher')}>
                <Link to={'/AddCoupon'}>
                    <Button primary small>
                        Thêm phiếu giảm giá
                    </Button>
                </Link>
            </div>
            {listCoupons.map((item) => (
                <ItemCoupon key={item.code} data={item} />
            ))}
        </div>
    );
}

export default CouponAdmin;
