import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ManagerUser.module.scss';
import ItemManager from '~/components/ItemManager/ItemManager';
import { listUser, listSelect } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSearch,faXmark } from '@fortawesome/free-solid-svg-icons';
import Select from '~/components/Select/Select';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function ManagerUser() {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(16);
    const [searchParams, setSearchParams] = useSearchParams();
      const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;

  const [keyword, setKeyword] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const HISTORY_KEY = 'searchHistory_sell';
  const navigate = useNavigate();

  // lấy lịch xử khi focus vào search
  const handleFocus = () => {
    const stored = localStorage.getItem(HISTORY_KEY);
    const history = stored ? JSON.parse(stored) : [];
    setSearchHistory(history);
    setShowHistory(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowHistory(false), 150);
  };
//xóa all lsu
  const clearSearchHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
    setSearchHistory([]);
  };
// xóa từng item trong lsu
  const deleteHistoryItem = (indexDel) => {
    const newHistory = searchHistory.filter((_, i) => i !== indexDel);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    setSearchHistory(newHistory);
  };
// lưu search vào localStorage
  const saveToSearchHistory = (keyword) => {
    let history = [...searchHistory];
    keyword = keyword.trim();
    if (!keyword) return;
// xóa trùng
    history = history.filter(
      (item) => item.toLowerCase() !== keyword.toLowerCase()
    );
     // key mới thì thêm đầu
    history.unshift(keyword);

    if (history.length > 10) {
      history = history.slice(0, 10);
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    setSearchHistory(history);
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      saveToSearchHistory(keyword);
      navigate(
        `/ManagerUser?search=${encodeURIComponent(keyword.trim())}`
      );
      setShowHistory(false);
    } else {
      navigate('/ManagerUser');
      setShowHistory(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
// lắng nghe event clear search để xóa đi từ khóa tìm kiếm
  useEffect(() => {
    const clearSearch = () => setKeyword('');
    window.addEventListener('clearSearch', clearSearch);
    return () => {
      window.removeEventListener('clearSearch', clearSearch);
    };
  }, []);

    const filters = useMemo(() => {
        return {
            status: searchParams.get('status') || 'Tất Cả',
            area:searchParams.get('area')||'Tất Cả',
        };
    }, [searchParams]);

    const handleFilterChange = (newFilters) => {
        setSearchParams(newFilters);
        setCurrentPage(1); // reset về trang đầu
    };

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
        return () => window.removeEventListener('resize', updateProductsPerPage);
    }, []);

    // Lọc dữ liệu theo status
    const filteredOrders = listUser.filter((order) => {
        if (filters.status === 'Tất Cả') return true;
        return order.roll === filters.status;
    });
    const filteredOrders2 = listUser.filter((order) => {
        if (filters.area === 'Tất Cả') return true;
        return order.area === filters.area;
    });

    const totalPages = Math.ceil(filteredOrders.length / productsPerPage||filteredOrders2.length/productsPerPage);

    const getPaginationRange = (currentPage, totalPages, delta = 2) => {
        const range = [];
        const left = Math.max(2, currentPage - delta);
        const right = Math.min(totalPages - 1, currentPage + delta);

        range.push(1);

        if (left > 2) range.push('...');

        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        if (right < totalPages - 1) range.push('...');

        if (totalPages > 1) range.push(totalPages);

        return range;
    };

    const paginationRange = getPaginationRange(currentPage, totalPages);


    const handlePageChange = (page) => {
        if (page === '...' || page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('find')}>
            <Select
                data={listSelect[6]}
                value={filters.status || 'Tất Cả'}
                onChange={(value) =>
                    handleFilterChange({ status: value || 'Tất Cả' })
                }
            />
              <Select
                data={listSelect[1]}
                value={filters.area || 'Tất Cả'}
                onChange={(value) =>
                    handleFilterChange({ area: value || 'Tất Cả' })
                }
            />
            <div className={cx('formSearch')}>
                      <input
                        type="text"
                        value={keyword}
                        placeholder="Nhập vào đây để tìm kiếm…"
                        onChange={(e) => setKeyword(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyPress}
                      />
                      <FontAwesomeIcon
                        icon={faSearch}
                        className={cx('iconSearch')}
                        onClick={handleSearch}
                      />
        
                      {showHistory && searchHistory.length > 0 && (
                        <ul className={cx('searchHistory')}>
                          <li className={cx('clearAll')} onClick={clearSearchHistory}>
                            Xóa tất cả
                          </li>
                          {searchHistory.map((item, index) => (
                            <li key={index} className={cx('historyItem')}>
                              <span
                                onClick={() => {
                                  setKeyword(item);
                                  setShowHistory(false);
                                  navigate(
                                    `/ManagerUser?search=${encodeURIComponent(item)}`
                                  );
                                }}
                              >
                                {item}
                              </span>
                              <span
                                className={cx('deleteBtn')}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteHistoryItem(index);
                                }}
                              >
                                <FontAwesomeIcon icon={faXmark} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                </div>
 
                
                <div className={cx('content')}> 
                       <ItemManager data={'user'} status={filters.status} area={filters.area} />
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
        </div>
    );
}

export default ManagerUser;
