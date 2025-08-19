import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import {
    featuredCategories,
    listProduct,
    slideImage,
} from '~/constant/mock-data';
import { useEffect, useRef, useState } from 'react';
import ItemProduct from '~/components/ItemProduct/ItemProduct';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                // kiểm tra nếu là ảnh cuối thì trả về 0 là ảnh đầu, ngược lại thì +1 để chuyển sang ảnh tiếp theo
                prevIndex === slideImage.length - 1 ? 0 : prevIndex + 1,
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const listRef = useRef(null);
    // lắng nge hành động kéo chuột
    const isDragging = useRef(false);

    const startX = useRef(0);
    const scrollLeft = useRef(0);
    // đánh dấu và lấy vị trí hiện tại để kéo
    const onMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - listRef.current.offsetLeft;
        scrollLeft.current = listRef.current.scrollLeft;
    };
    // khi rời chuột
    const onMouseLeave = () => {
        isDragging.current = false;
    };

    const onMouseUp = () => {
        isDragging.current = false;
    };
    // khi không kéo
    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - listRef.current.offsetLeft;
        const walk = (x - startX.current) * 1;
        listRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <>
            <div className={cx('slide-img')}>
                <div
                    className={cx('slide-track')}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slideImage.map((item, index) => (
                        <img
                            key={index}
                            src={item}
                            alt={`Slide ${index + 1}`}
                            className={cx('slide')}
                        />
                    ))}
                </div>
            </div>
            <div className={cx('features-bar')}>
                <div className={cx('features-item')}>
                    <FontAwesomeIcon
                        icon={faLeaf}
                        className={cx('features-icon')}
                    />
                    <h3 className={cx('freatures-title')}>
                        Freshness Guarantee
                    </h3>
                    <p className={cx('features-text')}>From farm to fork</p>
                </div>
                <div className={cx('features-item')}>
                    <FontAwesomeIcon
                        icon={faTruckFast}
                        className={cx('features-icon')}
                    />
                    <h3 className={cx('freatures-title')}>To your doorstep</h3>
                    <p className={cx('features-text')}>Instant delivery</p>
                </div>
            </div>

            <div className={cx('featured-products')}>
                <h2 className={cx('section-title')}>Sản phẩm nổi bật</h2>
                <div
                    className={cx('list-item-product')}
                    ref={listRef}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                >
                    {listProduct.map((item, index) => (
                        <ItemProduct key={index} data={item} />
                    ))}
                </div>
            </div>

            <div className={cx('welcome-section')}>
                <h2 className={cx('welcome-title')}>
                    Chào mừng bạn đến với TrungMart
                </h2>
                <p className={cx('welcome-description')}>
                    Tại TrungMart, chúng tôi hợp tác với nông dân và nhà sản
                    xuất địa phương để mang đến cho bạn những sản phẩm tốt nhất
                    của miền Trung Việt Nam.
                </p>
            </div>

            <div className={cx('featureCategories')}>
                {featuredCategories.map((item, index) => (
                    <div key={index} className={cx('categoriesItem')}>
                        <img src={item.image} alt={item.title} />
                        <div className={cx('overlay')}>
                            <span className={cx('text')}>{item.title}</span>
                            <Button text small>
                                Xem thêm
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
