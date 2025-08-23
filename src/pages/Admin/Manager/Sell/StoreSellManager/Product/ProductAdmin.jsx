import classNames from 'classnames/bind';
import styles from './ProductAdmin.module.scss';
import { Link, useParams } from 'react-router-dom';
import { storeList,listProduct} from '~/constant/mock-data';
import ItemProduct from '~/components/ItemProduct/ItemProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import StoreView from '~/components/StoreView/StoreView';

const cx = classNames.bind(styles);
function ProductAdmin() {
   const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(12);

    const store = storeList.find((item) => item.id === Number(id));
    const product = listProduct.filter(
        (item) => Number(item.idStore) === store.id,
    );
    const check = store.status==='cancelled'?true:false;
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
            <h4>Sản Phẩm cửa hàng</h4>
            <StoreView
                data={store}
                report={false}
                 form ={false}
                 check={check}
            />

            <div className={cx('menu-store')}>
                <Link
                    to={`/StoreAdmin/${id}`}
                    className={cx('menu-link')}
                >
                   Thông Tin Cửa Hàng
                </Link>
                <Link
                    to={`/ProductAdmin/${id}`}
                    className={cx('menu-link', 'active')}
                >
                    Sản phẩm
                </Link>
                  <Link
                    to={`/DetailStoreAdmin/${id}`}
                    className={cx('menu-link')}
                >
                    Thông Tin Chủ Cửa Hàng
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


        </>
    );
}

export default ProductAdmin;