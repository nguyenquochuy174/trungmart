import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import ItemShopCard from '~/components/ItemShopCard/ItemShopCard';
import Button from '~/components/Button/Button';
import {
    listAddress,
    listCoupons,
    listFavorites,
    listProduct,
    listSelect,
} from '~/constant/mock-data';
import { toast, ToastContainer } from 'react-toastify';
import MethodSelect from '~/components/MethodSelect/MethodSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import ItemCoupon from '~/components/ItemCoupon/ItemCoupon';
import images from '~/assets/images/image';

const cx = classNames.bind(styles);
function Payment() {
    const userId = localStorage.getItem('userId');
    const location = useLocation();
    const navigate = useNavigate();

    const [shippingFee, setShippingFee] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [showEvaluateForm, setShowEvaluateForm] = useState(false);
    const [ShowCoupon, setShowCoupon] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [SelectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const isCouponValid = (coupon) => {
        const today = new Date();
        const start = new Date(coupon.startDate);
        const end = new Date(coupon.endDate);
        return coupon.status === 'active' && start <= today && end >= today;
    };

    const itemFavorite = listFavorites.find(
        (item) => item.userId === Number(userId),
    );

    const listCouponFavorites = itemFavorite
        ? listCoupons.filter(
              (coupon) =>
                  itemFavorite.couponIds.includes(coupon.id) &&
                  isCouponValid(coupon),
          )
        : [];

    const listAddressUser = listAddress.filter(
        (item) => item.userId === parseInt(userId),
    );

    useEffect(() => {
        if (listAddressUser.length > 0 && !selectedAddress) {
            setSelectedAddress(listAddressUser[0]);
        }
    }, [listAddressUser, selectedAddress]);

    useEffect(() => {
        let selectedProducts = [];
        if (location.state?.selectedProducts) {
            selectedProducts = location.state.selectedProducts;
            sessionStorage.setItem(
                `payment_selectedProducts_${userId}`,
                JSON.stringify(selectedProducts),
            );
        } else {
            const saved = sessionStorage.getItem(
                `payment_selectedProducts_${userId}`,
            );
            if (saved) {
                selectedProducts = JSON.parse(saved);
            }
        }

        if (Array.isArray(selectedProducts) && selectedProducts.length > 0) {
            setCartItems(selectedProducts);
        } else if (location.state?.productId && location.state?.quantity) {
            const product = listProduct.find(
                (item) => item.id === location.state.productId,
            );
            if (product) {
                setCartItems([
                    { ...product, quantity: location.state.quantity },
                ]);
            }
        } else {
            const storedCart =
                JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
            const items = storedCart.map((cartItem) => {
                const product = listProduct.find(
                    (item) => item.id === cartItem.productId,
                );
                return { ...product, quantity: cartItem.quantity };
            });
            setCartItems(items);
        }
    }, [location.state, userId]);

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );
    const discountAmount = (() => {
        if (!selectedCoupon) return 0;
        if (selectedCoupon.minOrderValue > totalAmount) return 0;
        switch (selectedCoupon.type) {
            case 'percentage':
                return Math.min(
                    (selectedCoupon.value / 100) * totalAmount,
                    selectedCoupon.maxDiscount || Infinity,
                );
            case 'fixedAmount':
                return selectedCoupon.value;
            case 'freeShipping':
                return shippingFee || 0;
            default:
                return 0;
        }
    })();

    const handleShippingChange = (selectedOption) => {
        if (selectedOption?.fee !== undefined) {
            setShippingFee(selectedOption.fee);
        } else {
            setShippingFee(null);
        }
    };

    const handleOrder = () => {
        if (shippingFee === null) {
            toast.error(
                'Vui lòng chọn hình thức giao hàng trước khi đặt hàng!',
            );
            return;
        }
        toast.success('Đặt hàng thành công!');

        const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
        const orderedIds = cartItems.map((item) => item.id.toString());
        const updatedCart = cart.filter(
            (item) => !orderedIds.includes(item.productId.toString()),
        );
        localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
        sessionStorage.removeItem(`payment_selectedProducts_${userId}`);
        setTimeout(() => navigate('/UserProfileOrder?status=pending'), 1000);
    };

    return (
        <div className={cx('container')}>
            <h3 className={cx('title')}>Thanh toán</h3>

            <div className={cx('address')}>
                <div className={cx('addressChange')}>
                    <h3>
                        <FontAwesomeIcon icon={faLocationDot} /> Địa chỉ nhận
                        hàng
                    </h3>
                    <Button
                        outline
                        small
                        onClick={() => setShowEvaluateForm(true)}
                    >
                        Thay đổi
                    </Button>
                </div>
                <div className={cx('addresDetail')}>
                    {selectedAddress ? (
                        <ul>
                            <li>
                                <strong>Họ tên</strong>
                                <span className={cx('addressText')}>
                                    {selectedAddress.name}
                                </span>
                            </li>
                            <li>
                                <strong>Số điện thoại</strong>
                                <span className={cx('addressText')}>
                                    {selectedAddress.phone}
                                </span>
                            </li>
                            <li>
                                <strong>Địa chỉ</strong>
                                <span className={cx('addressText')}>
                                    {selectedAddress.address}
                                </span>
                            </li>
                        </ul>
                    ) : (
                        <p>Không có địa chỉ để hiển thị</p>
                    )}
                </div>
            </div>

            <div className={cx('banner')}>
                <p className={cx('bannerFirst')}>Sản phẩm</p>
                <p>Giá</p>
                <p>Số lượng</p>
                <p>Thành tiền</p>
            </div>

            {cartItems.map((item, index) => (
                <ItemShopCard
                    key={index}
                    quantitys={item.quantity}
                    data={item}
                />
            ))}

            <div className={cx('note')}>
                <p>Ghi chú</p>
                <input
                    type="text"
                    placeholder="Nhập ghi chú của bạn cho cửa hàng ..."
                />
            </div>

            <div className={cx('deliveryMethods')}>
                <h3>Hình thức giao hàng</h3>
                <MethodSelect
                    data={listSelect.find((item) => item.id === 9)}
                    onChange={handleShippingChange}
                />
            </div>
            <div className={cx('couponSelect')}>
                <div className={cx('coupon')}>
                    <h3>Mã giảm giá</h3>
                    <Button outline small onClick={() => setShowCoupon(true)}>
                        Chọn mã giảm
                    </Button>
                </div>
                {selectedCoupon && (
                    <ItemCoupon
                        data={selectedCoupon}
                        selected
                        onCancel={() => setSelectedCoupon(null)}
                    />
                )}
            </div>

            <div className={cx('itemPayment')}>
                <h3>Phương thức thanh toán</h3>
                <div className={cx('checkoutBox')}>
                    <div className={cx('paymentMethod')}>
                        <MethodSelect
                            data={listSelect.find((item) => item.id === 10)}
                            onChange={(selectedOption) =>
                                setSelectedPaymentMethod(selectedOption)
                            }
                        />
                        {SelectedPaymentMethod?.value === 'qrcode' && (
                            <div className={cx('qrCode')}>
                                <img
                                    src={images.QRCode}
                                    alt="QR Code của shop"
                                />
                                <p>
                                    Vui lòng quét mã bằng ứng dụng ngân hàng
                                    hoặc ví điện tử
                                </p>
                            </div>
                        )}
                    </div>

                    <div className={cx('totals')}>
                        <div className={cx('totalsRow')}>
                            <span>Tổng tiền hàng</span>
                            <span>{totalAmount.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className={cx('totalsRow')}>
                            <span>Chi phí vận chuyển</span>
                            <span>
                                {shippingFee !== null
                                    ? `${shippingFee.toLocaleString('vi-VN')}đ`
                                    : '---'}
                            </span>
                        </div>
                        <div className={cx('totalsRow')}>
                            <span>Giảm giá</span>
                            <span>
                                {discountAmount.toLocaleString('vi-VN')}đ
                            </span>
                        </div>
                        <div className={cx('totalsRow')}>
                            <span>Tổng thanh toán</span>
                            <span className={cx('totalPrice')}>
                                {(
                                    totalAmount +
                                    (shippingFee || 0) -
                                    discountAmount
                                ).toLocaleString('vi-VN')}
                                đ
                            </span>
                        </div>
                    </div>
                </div>

                <div className={cx('check')}>
                    <p>
                        Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý theo{' '}
                        <strong>Điều khoản TrungMart</strong>
                    </p>
                    <div className={cx('totalAmount')}>
                        <Button primary small onClick={handleOrder}>
                            Đặt hàng
                        </Button>
                    </div>
                </div>
            </div>

            {showEvaluateForm && (
                <div
                    className={cx('modalOverlay')}
                    onClick={() => setShowEvaluateForm(false)}
                >
                    <div
                        className={cx('modalContent')}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Chọn địa chỉ giao hàng</h3>
                        {listAddressUser.length > 0 ? (
                            <div className={cx('listAddress')}>
                                {listAddressUser.map((item) => (
                                    <div
                                        className={cx('itemAddress')}
                                        key={item.id}
                                    >
                                        <div className={cx('info')}>
                                            <h4>{item.name}</h4>
                                            <p>{item.phone}</p>
                                            <p>{item.address}</p>
                                        </div>
                                        <Button
                                            small
                                            onClick={() => {
                                                setSelectedAddress(item);
                                                setShowEvaluateForm(false);
                                            }}
                                        >
                                            Chọn
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={cx('noAddress')}>
                                <p>Bạn chưa có địa chỉ giao hàng.</p>
                                <Button
                                    primary
                                    onClick={() =>
                                        navigate('/UserProfileAddress')
                                    }
                                >
                                    Thêm địa chỉ
                                </Button>
                            </div>
                        )}
                        <div className={cx('btnClose')}>
                            <Button
                                outline
                                small
                                onClick={() => setShowEvaluateForm(false)}
                            >
                                Đóng
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {ShowCoupon && (
                <div
                    className={cx('modalOverlay')}
                    onClick={() => setShowEvaluateForm(false)}
                >
                    <div
                        className={cx('modalContent')}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Chọn mã giảm giá</h3>
                        {listCouponFavorites.length > 0 ? (
                            <>
                                {listCouponFavorites.map((item) => (
                                    <ItemCoupon
                                        data={item}
                                        key={item.id}
                                        payment
                                        onSelect={() => {
                                            if (
                                                item.minOrderValue > totalAmount
                                            ) {
                                                toast.warning(
                                                    'Đơn hàng của bạn chưa đủ điều kiện để áp dụng mã này.',
                                                );
                                                setShowCoupon(false);
                                            } else {
                                                setSelectedCoupon(item);
                                                setShowCoupon(false);
                                            }
                                        }}
                                    />
                                ))}
                            </>
                        ) : (
                            <p>Bạn không có mã giảm giá!</p>
                        )}

                        <div className={cx('btnClose')}>
                            <Button
                                outline
                                small
                                onClick={() => setShowCoupon(false)}
                            >
                                Đóng
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
}

export default Payment;
