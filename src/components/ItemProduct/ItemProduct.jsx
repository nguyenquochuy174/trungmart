import classNames from 'classnames/bind';
import styles from './ItemProduct.module.scss';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ItemProduct({ data }) {
    const productImages = data.image || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
    const navigate = useNavigate();
    
   const idSell = localStorage.getItem('idSell');

const handleViewDetail = () => {
    if (idSell) {
        navigate(`/DetailProductSell/${data.id}`);
    } else {
        navigate(`/UserDetailProduct/${data.id}`);
    }
};


    const handlePrev = () => {
        setDirection('prev');
        setCurrentIndex((prev) =>
            prev === 0 ? productImages.length - 1 : prev - 1,
        );
    };

    const handleNext = () => {
        setDirection('next');
        setCurrentIndex((prev) =>
            prev === productImages.length - 1 ? 0 : prev + 1,
        );
    };

    // tính sao đánh giá
    const rating =
        data.totalStars && data.reviews
            ? (data.totalStars / data.reviews).toFixed(1)
            : 0;
    // kiểm tra để điều chỉnh size button
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 576);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={cx('itemProduct')}>
            <div className={cx('imgWrapper')}>
                {productImages.length >= 2 && (
                    <button
                        className={cx('navBtn', 'prev')}
                        onClick={handlePrev}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                )}
                {productImages.length > 0 && (
                    <img
                        src={productImages[currentIndex].url}
                        alt={productImages[currentIndex].alt}
                        className={cx(
                            'img',
                            direction === 'next' ? 'slide-next' : 'slide-prev',
                        )}
                    />
                )}
                {productImages.length >= 2 && (
                    <button
                        className={cx('navBtn', 'next')}
                        onClick={handleNext}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                )}
            </div>

            <div className={cx('info')}>
                <h3 className={cx('name')}>{data.name}</h3>
                <p className={cx('price')}>
                    {data.price.toLocaleString('vi-VN')}đ
                </p>
                <div className={cx('rating')}>
                    <span className={cx('score')}>
                        {rating}{' '}
                        <FontAwesomeIcon
                            icon={faStar}
                            className={cx('iconStar')}
                        />
                    </span>
                    <span className={cx('reviews')}>
                        {data.reviews} đánh giá
                    </span>
                </div>
            </div>
            <Button primary small={isMobile} onClick={handleViewDetail}>
                Xem Chi Tiết
            </Button>
        </div>
    );
}

export default ItemProduct;
