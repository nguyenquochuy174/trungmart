import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { listProduct, listSelect } from '~/constant/mock-data';
import Select from '~/components/Select/Select';
import RatingSelect from '~/components/RatingSelect/RatingSelect';
import ItemProduct from '~/components/ItemProduct/ItemProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Product() {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(16);
    const [searchParams, setSearchParams] = useSearchParams();

    // filters lọc
    const filters = useMemo(() => {
        const priceValue = searchParams.get('price');
        const price = priceValue ? priceValue.split(',').map(Number) : null;

        return {
            price: price,
            area: searchParams.get('area') || null,
            rating: searchParams.get('rating')
                ? Number(searchParams.get('rating'))
                : null,
            keyword: searchParams.get('search') || '',
            category: searchParams.get('category') || null,
        };
    }, [searchParams]);

    useEffect(() => {
        function updateProductsPerPage() {
            const width = window.innerWidth;
            if (width <= 576 || width >= 993) {
                setProductsPerPage(16);
            } else {
                setProductsPerPage(15);
            }
        }

        updateProductsPerPage();
        window.addEventListener('resize', updateProductsPerPage);

        return () =>
            window.removeEventListener('resize', updateProductsPerPage);
    }, []);

    // lọc sản phẩm
    const filteredProducts = useMemo(() => {
        return listProduct.filter((product) => {
            let matches = true;

            if (filters.price && Array.isArray(filters.price)) {
                const [minPrice, maxPrice] = filters.price;
                if (
                    typeof minPrice === 'number' &&
                    typeof maxPrice === 'number'
                ) {
                    matches =
                        matches &&
                        product.price >= minPrice &&
                        product.price <= maxPrice;
                }
            }

            if (filters.area) {
                matches = matches && product.area === filters.area;
            }

            if (filters.rating) {
                const averageRating =
                    product.reviews === 0
                        ? 0
                        : product.totalStars / product.reviews;
                matches = matches && averageRating >= filters.rating;
            }
            if (filters.keyword) {
                const keyword = filters.keyword.toLowerCase();
                const nameMatch = product.name.toLowerCase().includes(keyword);
                const descMatch = product.description
                    ?.toLowerCase()
                    .includes(keyword);
                matches = matches && (nameMatch || descMatch);
            }
            if (filters.category) {
                matches = matches && product.category === filters.category;
            }

            return matches;
        });
    }, [filters]);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage,
    );

    const handlePageChange = (page) => {
        if (page === '...' || page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const handleFilterChange = (newFilter) => {
        Object.entries(newFilter).forEach(([key, value]) => {
            if (
                value === null ||
                value === 'Tất cả' ||
                (Array.isArray(value) && value.length === 0)
            ) {
                searchParams.delete(key);
            } else {
                searchParams.set(
                    key,
                    Array.isArray(value) ? value.join(',') : value,
                );
            }
        });
        setSearchParams(searchParams);
        setCurrentPage(1);
    };
    const handleResetFilters = () => {
        setSearchParams({});
        setCurrentPage(1);

        // gửi event reset clear search
        const event = new Event('clearSearch');
        window.dispatchEvent(event);
    };

    return (
        <>
            <div className={cx('filter')}>
                <Select
                    data={listSelect[0]}
                    value={filters.price || ''}
                    onChange={(value) =>
                        handleFilterChange({
                            price: value || null,
                        })
                    }
                />
                <Select
                    data={listSelect[1]}
                    value={filters.area || ''}
                    onChange={(value) =>
                        handleFilterChange({
                            area: value || null,
                        })
                    }
                />
                <RatingSelect
                    value={filters.rating}
                    onChange={(val) =>
                        handleFilterChange({
                            rating: val,
                        })
                    }
                />
                <button
                    className={cx('resetFilterBtn')}
                    onClick={handleResetFilters}
                    title="Reset bộ lọc"
                    type="button"
                >
                    <FontAwesomeIcon icon={faRotateLeft} />
                </button>
            </div>

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
        </>
    );
}

export default Product;
