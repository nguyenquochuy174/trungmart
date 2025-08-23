import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import ItemShopCard from '~/components/ItemShopCard/ItemShopCard';
import Button from '~/components/Button/Button';
import { listProduct } from '~/constant/mock-data';

const cx = classNames.bind(styles);

function Payment() {
    const location = useLocation();

    const { selectedProducts, productId, quantity } = location.state || {};
    let cartItems = [];

    if (Array.isArray(selectedProducts) && selectedProducts.length > 0) {
        cartItems = selectedProducts;
    } else if (productId && quantity) {
        const product = listProduct.find((item) => item.id === productId);
        if (product) {
            cartItems = [{ ...product, quantity }];
        }
    } else {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems = storedCart.map((cartItem) => {
            const product = listProduct.find(
                (item) => item.id === cartItem.productId,
            );
            return { ...product, quantity: cartItem.quantity };
        });
    }

    const totalAmount = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    return (
        <div className={cx('container')}>
            <h3 className={cx('title')}>Thanh toán</h3>
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

            <div className={cx('itemPayment')}>
                <h3>Phương thức thanh toán</h3>
                <div className={cx('checkoutBox')}>
                    <div className={cx('paymentMethod')}>
                        <select id="payment" className={cx('paymentSelect')}>
                            <option>Thanh toán khi nhận hàng</option>
                            <option>Thanh toán QRCode</option>
                        </select>
                    </div>

                    <div className={cx('totals')}>
                        <div className={cx('totalsRow')}>
                            <span>Tổng tiền hàng</span>
                            <span>{totalAmount.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className={cx('totalsRow')}>
                            <span>Chi phí vận chuyển</span>
                            <span>30.000đ</span>
                        </div>
                        <div className={cx('totalsRow')}>
                            <span>Giảm giá</span>
                            <span>30.000đ</span>
                        </div>
                        <div className={cx('totalsRow')}>
                            <span>Tổng thanh toán</span>
                            <span className={cx('totalPrice')}>
                                {(totalAmount + 30000 - 30000).toLocaleString(
                                    'vi-VN',
                                )}
                                đ
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('check')}>
                    <p>
                        Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý theo
                        <strong>Điều khoản TrungMart</strong>
                    </p>
                    <div className={cx('totalAmount')}>
                        <Button primary small>
                            Đặt hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
