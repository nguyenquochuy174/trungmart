import classNames from 'classnames/bind';
import styles from './ProfileFavoriteShop.module.scss';
import { listFavorites, storeList } from '~/constant/mock-data';
import StoreView from '~/components/StoreView/StoreView';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
// import { useState } from 'react';
const cx = classNames.bind(styles);
function ProfileFavoriteShop() {
    const userId = Number(localStorage.getItem('userId'));
    const [currentPage, setCurrentPage] = useState(1);
    const itemFavorite = listFavorites.find((item) => item.userId === userId);
    const listStoreFavorites = itemFavorite
        ? storeList.filter((store) => itemFavorite.storeIds.includes(store.id))
        : [];
    const totalPages = Math.ceil(listStoreFavorites.length / 8);

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

    const currentStores = listStoreFavorites.slice(
        (currentPage - 1) * 8,
        currentPage * 8,
    );

    const handlePageChange = (page) => {
        if (page === '...' || page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className={cx('container')}>
            {currentStores.map((item) => (
                <StoreView key={item.id} data={item} report={false} />
            ))}

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

export default ProfileFavoriteShop;
