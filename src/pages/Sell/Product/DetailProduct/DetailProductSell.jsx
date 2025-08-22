import styles from "./DetailProductSell.module.scss"
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { listProduct, reportForm, storeList } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,

    faStar,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Button from '~/components/Button/Button';
import {

} from '@fortawesome/free-brands-svg-icons';
import StoreView from '~/components/StoreView/StoreView';
import ItemProduct from '~/components/ItemProduct/ItemProduct';
import ReviewItem from '~/components/ReviewItem/ReviewItem';
import FormApprove from '~/components/FormApprove/FormApprove';
const cx = classNames.bind(styles);
function DetailProductSell() {
    const { id } = useParams();
    const product = listProduct.find((item) => item.id === Number(id));
    const productImages = product.image || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');
    const [quantity, setQuantity] = useState(5);
    const [productsPerPage, setProductsPerPage] = useState(8);
    const [showReportForm, setShowReportForm] = useState(false);

    const idSell = parseInt(localStorage.getItem('idSell'));
    const store = storeList.find(
        (store) => store.id === idSell,
    );

    useEffect(() => {
        function updateProductsPerPage() {
            const width = window.innerWidth;
            if (width > 576 && width < 1200) {
                setProductsPerPage(9);
            } else {
                setProductsPerPage(8);
            }
        }
        updateProductsPerPage();
        window.addEventListener('resize', updateProductsPerPage);

        return () => {
            window.removeEventListener('resize', updateProductsPerPage);
        };
    }, []);

    const newListProduct = listProduct
        .filter(
            (item) =>
                item.id !== product.id && item.idStore === product.idStore,
        )
        .sort(() => 0.5 - Math.random());

    const productOther = newListProduct.slice(0, productsPerPage);

    if (!product) {
        return <p>Sản phẩm không tồn tại</p>;
    }
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

    return (
        <>
            <div className={cx('viewProduct')}>
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
                                direction === 'next'
                                    ? 'slide-next'
                                    : 'slide-prev',
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
                <div className={cx('viewInfo')}>
                    <h3 className={cx('title')}>{product.name}</h3>
                    <p className={cx('description')}>{product.description}</p>
                    <p>Giá: {product.price.toLocaleString('vi-VN')}đ</p>
                    <div className={cx('quantity')}>
                        <p>Số lượng:</p>
                        <div className={cx('quantityControl')}>

                            <span className={cx('qtyValue')}>{product.quantity}</span>
 
                        </div>
                    </div>
                    <div className={cx('comment')}>
                        <p>
                            {' '}
                            {(product.totalStars / product.reviews).toFixed(
                                1,
                            )}{' '}
                            <FontAwesomeIcon
                                icon={faStar}
                                className={cx('iconStar')}
                            />
                        </p>
                        <p>{product.reviews} Đánh giá</p>
                    </div>

                    <div className={cx('btn')}>
                        <a href={`/EditProductSell/${product.id}`}>
                        <Button outline small>
                            Sửa
                        </Button>
                        </a>
                        <Button 
                        primary 
                        small 
                        onClick={()=>setShowReportForm(true)}
                        >
                            Xóa
                            
                        </Button>
                    </div>

                   
                </div>
            </div>
          
            <div className={cx('otherProduct')}>
                <h3>Sản phẩm khác của cửa hàng</h3>

                <div className={cx('listOtherProduct')}>
                    {productOther.map((item, index) => (
                        <ItemProduct key={index} data={item} />
                    ))}
                </div>
            </div>

            <div className={cx('review')}>
                <h3>Đánh giá sản phẩm</h3>

                <ReviewItem data={id} />
            </div>

            {showReportForm && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalContent')}>
                        <FormApprove
                            data={reportForm[3]}
                            onClose={() => setShowReportForm(false)}
                           
                        />
                    </div>
                </div>
            )}
        </>
    );
}
export default DetailProductSell;