import classNames from 'classnames/bind';
import styles from './ShoppingCart.module.scss';
import ItemShopCard from '~/components/ItemShopCard/ItemShopCard';
import Button from '~/components/Button/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listProduct } from '~/constant/mock-data';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function ShoppingCart() {
    const userId = localStorage.getItem('userId');
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const storedCart =
            JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
        const items = storedCart.map((cartItem) => {
            const product = listProduct.find(
                (item) => item.id === cartItem.productId,
            );
            return { ...product, quantity: cartItem.quantity };
        });
        setCartItems(items);
    }, [userId]);

    const updateLocalStorage = (items) => {
        const storedCart = items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
        }));
        localStorage.setItem(`cart_${userId}`, JSON.stringify(storedCart));
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedCart = cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item,
        );
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const handleDeleteItem = (productId) => {
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
        setSelectedItems((prev) => prev.filter((id) => id !== productId));
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    };

    const handleSelectItem = (productId, isChecked) => {
        setSelectedItems((prev) =>
            isChecked
                ? [...prev, productId]
                : prev.filter((id) => id !== productId),
        );
    };

    const handleDeleteSelected = () => {
        const updatedCart = cartItems.filter(
            (item) => !selectedItems.includes(item.id),
        );
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
        setSelectedItems([]);
        toast.success('Đã xóa các sản phẩm được chọn');
    };
    const selectedProducts = cartItems.filter((item) =>
        selectedItems.includes(item.id),
    );

    const totalSelected = selectedProducts.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    return (
        <div className={cx('container')}>
            <h3 className={cx('title')}>Giỏ hàng</h3>
            <div className={cx('banner')}>
                <p className={cx('bannerFirst')}>Sản phẩm</p>
                <p>Giá</p>
                <p>Số lượng</p>
                <p>Thành tiền</p>
            </div>

            {cartItems.map((item, index) => (
                <ItemShopCard
                    shopcard
                    key={index}
                    data={item}
                    quantitys={item.quantity}
                    onQuantityChange={(newQty) =>
                        handleQuantityChange(item.id, newQty)
                    }
                    onDelete={() => handleDeleteItem(item.id)}
                    onSelectChange={(checked) =>
                        handleSelectItem(item.id, checked)
                    }
                    isSelected={selectedItems.includes(item.id)}
                />
            ))}

            <div className={cx('payment')}>
                <Button text onClick={handleDeleteSelected}>
                    Xóa chọn
                </Button>
                <div className={cx('totalAmount')}>
                    <p>Tổng cộng: {totalSelected.toLocaleString('vi-VN')}đ</p>
                    {selectedItems.length > 0 ? (
                        <Link to="/UserPayment" state={{ selectedProducts }}>
                            <Button primary small>
                                Thanh Toán
                            </Button>
                        </Link>
                    ) : (
                        <Button primary small disabled>
                            Thanh Toán
                        </Button>
                    )}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
}

export default ShoppingCart;
