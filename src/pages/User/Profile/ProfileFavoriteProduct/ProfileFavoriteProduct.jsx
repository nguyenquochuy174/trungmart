import classNames from 'classnames/bind';
import styles from './ProfileFavoriteProduct.module.scss';
import { listFavorites, listProduct } from '~/constant/mock-data';
import ItemProduct from '~/components/ItemProduct/ItemProduct';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function ProfileFavoriteProduct() {
    const userId = Number(localStorage.getItem('userId'));
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);
    const itemFavorite = listFavorites.find((item) => item.userId === userId);
    useEffect(() => {
        function updateProductsPerPage() {
            const width = window.innerWidth;
            if (width < 1200) {
                setProductsPerPage(8);
            }
        }

        updateProductsPerPage();
        window.addEventListener('resize', updateProductsPerPage);

        return () =>
            window.removeEventListener('resize', updateProductsPerPage);
    }, []);

    const listProductFavorites = itemFavorite
        ? listProduct.filter((product) =>
              itemFavorite.productIds.includes(product.id),
          )
        : [];
    const totalPages = Math.ceil(listProductFavorites.length / productsPerPage);

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

    const currentProducts = listProductFavorites.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage,
    );

    const handlePageChange = (page) => {
        if (page === '...' || page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('listProduct')}>
                {currentProducts.map((item, index) => (
                    <ItemProduct key={index} data={item} />
                ))}
            </div>
            {/* Phân trang */}
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
        </div>
    );
}

export default ProfileFavoriteProduct;
