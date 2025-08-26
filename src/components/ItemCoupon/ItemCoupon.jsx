import classNames from 'classnames/bind';
import styles from './ItemCoupon.module.scss';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

function ItemCoupon({
    data,
    user = false,
    payment = false,
    selected = false,
    onSelect,
    onCancel,
}) {
    const formatCouponValue = () => {
        if (data.type === 'percentage') return `Giảm ${data.value}%`;
        if (data.type === 'fixedAmount')
            return `Giảm ${data.value.toLocaleString()}đ`;
        if (data.type === 'freeShipping') return 'Miễn phí vận chuyển';
        return '';
    };
    const isExpired = () => {
        const today = new Date();
        const endDate = new Date(data.endDate);
        return today > endDate;
    };
    const isDisabled = () => {
        return isExpired(data) || data.quantity <= 0;
    };
    return (
        <div className={cx('coupon-list')}>
            <div
                key={data.code}
                className={cx('coupon-card', {
                    disabled: isDisabled(),
                    active: !isDisabled(),
                })}
            >
                <div className={cx('top-row')}>
                    <h3 className={cx('code')}>{data.code}</h3>
                    <span className={cx('status')}>
                        {data.status.toUpperCase()}
                    </span>
                </div>

                <div className={cx('content-container')}>
                    <div className={cx('content-left')}>
                        <p className={cx('description')}>{data.description}</p>
                        <p className={cx('value')}>{formatCouponValue()}</p>
                        {!user && !payment && !selected && (
                            <p className={cx('quantity')}>
                                Số lượng: {data.quantity}
                            </p>
                        )}
                        <p className={cx('date')}>
                            Hiệu lực: {data.startDate} - {data.endDate}
                        </p>
                        {data.minOrderValue > 0 ? (
                            <p className={cx('condition')}>
                                Áp dụng cho đơn từ{' '}
                                {data.minOrderValue.toLocaleString()}đ
                            </p>
                        ) : (
                            <p className={cx('condition')}>
                                Không yêu cầu đơn tối thiểu
                            </p>
                        )}
                    </div>
                    {user && <Button text>Xóa</Button>}
                    {payment &&
                        (isDisabled() ? (
                            <Button small disabled>
                                {data.quantity <= 0 ? 'Hết mã giảm' : 'Hết hạn'}
                            </Button>
                        ) : (
                            <Button small outline onClick={onSelect}>
                                Chọn
                            </Button>
                        ))}
                    {selected && (
                        <Button text onClick={onCancel}>
                            Hủy
                        </Button>
                    )}

                    {!user &&
                        !selected &&
                        !payment &&
                        (isDisabled() ? (
                            <Button small disabled>
                                {data.quantity <= 0 ? 'Hết mã giảm' : 'Hết hạn'}
                            </Button>
                        ) : (
                            <Button small outline>
                                Nhận
                            </Button>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ItemCoupon;
