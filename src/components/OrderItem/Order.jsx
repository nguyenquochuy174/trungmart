import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import images from '~/assets/images/image';
import Button from '../Button/Button';
import { listAddress, listProduct, reportForm } from '~/constant/mock-data';
import FormApprove from '../FormApprove/FormApprove';
import { useState } from 'react';

const cx = classNames.bind(styles);

function OrderItem({ data }) {
    const address = listAddress.find((item) => item.id === data.idAddress);
    const itemProduct = listProduct.find((item) => item.id === data.idProduct);
    const sumProductCoin = data.quantity * itemProduct.price;
    const totalAmount =
        data.quantity * itemProduct.price - data.discount + data.shippingFee;
    const [showEvaluateForm, setShowEvaluateForm] = useState(false);
    const [showCancelForm, setShowCancelForm] = useState(false);

    return (
        <div className={cx('container')}>
            <div className={cx('infoOrder')}>
                <div className={cx('itemProduct')}>
                    <h3>Sản phẩm</h3>
                    <div className={cx('itemInfo')}>
                        <img src={images.banhLoc.img1} alt="product" />
                        <div className={cx('content')}>
                            <h3>{itemProduct.name}</h3>
                            <p>Địa chỉ giao: {address.address}</p>
                            <p>Tên người nhận: {address.name}</p>
                            <p>Số điện thoại: {address.phone}</p>
                        </div>
                    </div>
                </div>
                <div className={cx('itemQuantity')}>
                    <h3>Số lượng</h3>
                    <div className={cx('quantity')}>
                        <p>{data.quantity}</p>
                    </div>
                </div>
                <div className={cx('itemPrice')}>
                    <h3>Thành tiền</h3>
                    <div className={cx('price')}>
                        <ul>
                            <li>
                                <p>Tổng tiền: </p>{' '}
                                {sumProductCoin.toLocaleString('vi-VN') + 'đ'}
                            </li>
                            <li>
                                <p>Giảm giá:</p>{' '}
                                {data.discount.toLocaleString('vi-VN') + 'đ'}
                            </li>
                            <li>
                                <p>Phí vận chuyển: </p>{' '}
                                {data.shippingFee.toLocaleString('vi-VN') + 'đ'}
                            </li>
                            <li className={cx('priceTotal')}>
                                <p className={cx('total')}>Tổng: </p>
                                <b>
                                    {totalAmount.toLocaleString('vi-VN') + 'đ'}
                                </b>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {data.status === 'shipping' && (
                <div className={cx('status')}>
                    <h4>Đang giao hàng</h4>
                </div>
            )}
            {data.status === 'cancelled' && (
                <div className={cx('status')}>
                    <h4>Đã hủy</h4>
                    <p>Lý do: {data.reason}</p>
                </div>
            )}
            {data.status === 'pending' && (
                <div className={cx('status')}>
                    <h4>Đang chờ duyệt</h4>
                    <Button text onClick={() => setShowCancelForm(true)}>
                        Hủy
                    </Button>
                </div>
            )}
            {data.status === 'approved' && (
                <div className={cx('status')}>
                    <h4>Đã giao</h4>
                    <Button
                        primary
                        small
                        onClick={() => setShowEvaluateForm(true)}
                    >
                        Đánh giá
                    </Button>
                </div>
            )}

            {showEvaluateForm && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalContent')}>
                        <FormApprove
                            data={reportForm[2]}
                            onClose={() => setShowEvaluateForm(false)}
                        />
                    </div>
                </div>
            )}
            {showCancelForm && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalContent')}>
                        <FormApprove
                            data={reportForm[1]}
                            onClose={() => setShowCancelForm(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderItem;
