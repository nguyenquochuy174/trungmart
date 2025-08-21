import classNames from 'classnames/bind';
import styles from './ProductShop.module.scss';
import StoreView from '~/components/StoreView/StoreView';
import FormApprove from '~/components/FormApprove/FormApprove';
import { useEffect, useState } from 'react';
import { listProduct, reportForm, storeList } from '~/constant/mock-data';
import ItemProduct from '~/components/ItemProduct/ItemProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
function ProductShop() {
    const { shopId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [showReportForm, setShowReportForm] = useState(false);
    const [productsPerPage, setProductsPerPage] = useState(12);

    const store = storeList.find((item) => item.id === Number(shopId));
    const product = listProduct.filter(
        (item) => Number(item.idStore) === store.id,
    );
    useEffect(() => {
        function updateProductsPerPage() {
            const width = window.innerWidth;
            if (width <= 576 || width >= 993) {
                setProductsPerPage(12);
            } else {
                setProductsPerPage(9);
            }
        }

        updateProductsPerPage();
        window.addEventListener('resize', updateProductsPerPage);

        return () =>
            window.removeEventListener('resize', updateProductsPerPage);
    }, []);

    const totalPages = Math.ceil(product.length / productsPerPage);

    // phân trang
    const getPaginationRange = (currentPage, totalPages, delta = 2) => {
        const range = [];
        const left = Math.max(2, currentPage - delta);
        const right = Math.min(totalPages - 1, currentPage + delta);

        range.push(1);

        if (left > 2) {
            range.push('...');
        }

        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        if (right < totalPages - 1) {
            range.push('...');
        }

        if (totalPages > 1) {
            range.push(totalPages);
        }

        return range;
    };

    const paginationRange = getPaginationRange(currentPage, totalPages);

    const currentProducts = product.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage,
    );

    const handlePageChange = (page) => {
        if (page === '...' || page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <>
            <h4 className={cx('title')}>Thông tin cửa hàng</h4>
            <StoreView
                data={store}
                report={true}
                onReportClick={() => setShowReportForm(true)}
            />
            <div className={cx('menu-store')}>
                <Link
                    to={`/UserInfoShop/${store.id}`}
                    className={cx('menu-link')}
                >
                    Thông tin
                </Link>
                <Link
                    to={`/UserProductShop/${store.id}`}
                    className={cx('menu-link', 'active')}
                >
                    Sản phẩm
                </Link>
            </div>

            <div className={cx('listProduct')}>
                {currentProducts.map((item, index) => (
                    <ItemProduct key={index} data={item} />
                ))}
            </div>

            <div className={cx('pagination')}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                {paginationRange.map((page, index) => (
                    <button
                        key={index}
                        className={cx({ active: currentPage === page })}
                        onClick={() => handlePageChange(page)}
                        disabled={page === '...'}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>

            {showReportForm && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalContent')}>
                        <FormApprove
                            data={reportForm[0]}
                            onClose={() => setShowReportForm(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductShop;
