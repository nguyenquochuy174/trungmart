import classNames from 'classnames/bind';
import styles from './ItemShopCard.module.scss';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ItemShopCard({
    shopcard = false,
    data,
    quantitys,
    onQuantityChange,
    onDelete,
    onSelectChange,
    isSelected,
}) {
    const [quantity, setQuantity] = useState(() => quantitys || 1);
    const [checked, setChecked] = useState(isSelected || false);

    useEffect(() => {
        setQuantity(quantitys || 1);
    }, [quantitys]);

    useEffect(() => {
        setChecked(isSelected);
    }, [isSelected]);

    const handleDecrease = () => {
        const newQty = Math.max(1, quantity - 1);
        setQuantity(newQty);
        onQuantityChange?.(newQty);
    };

    const handleIncrease = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        onQuantityChange?.(newQty);
    };

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setChecked(isChecked);
        onSelectChange?.(isChecked);
    };

    return (
        <div className={cx('itemCard')}>
            <div className={cx('product')}>
                {shopcard && (
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleCheckboxChange}
                    />
                )}
                <div className={cx('productContent')}>
                    <img src={data.image[0].url} alt="AnhSanPham" />
                    <div className={cx('content')}>
                        <h4>{data.name}</h4>
                        <p>{data.description}</p>
                    </div>
                </div>
            </div>
            <div className={cx('detailCard')}>
                <p className={cx('price')}>
                    {data.price.toLocaleString('vi-VN')}đ
                </p>
                {shopcard ? (
                    <div className={cx('quantityControl')}>
                        <button
                            className={cx('qtyBtn')}
                            onClick={handleDecrease}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className={cx('qtyValue')}>{quantity}</span>
                        <button
                            className={cx('qtyBtn')}
                            onClick={handleIncrease}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                ) : (
                    <p className={cx('quantitysPayment')}>{quantitys}</p>
                )}
                <p className={cx('total')}>
                    {(data.price * quantity).toLocaleString('vi-VN')}đ
                </p>
                {shopcard && (
                    <Button text small onClick={onDelete}>
                        Xóa
                    </Button>
                )}
            </div>
        </div>
    );
}

export default ItemShopCard;
