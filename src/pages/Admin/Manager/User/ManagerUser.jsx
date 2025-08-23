import classNames from 'classnames/bind';
import styles from './ManagerUser.module.scss';
import FormApprove from '~/components/FormApprove/FormApprove';
import { listUser, reportForm, listinfoSell, listSelect } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faSearch,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Select from '~/components/Select/Select';

const cx = classNames.bind(styles);

function ManagerUser() {
  const [hover, setHover] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = (searchParams.get('search') || '').toLowerCase();
  // Modal state
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showUnblockFormUser, setShowUnblockFormUser] = useState(false);


  const statusMapUser = {
    Sell: ['user', 'Khách Hàng'],
    block: ['block', 'Khóa'],
    user: ['user', 'Khách Hàng'],
  };

  const viewUser = (roll) => {
    const [cls, text] = statusMapUser[roll] || ['user', 'Khách Hàng'];
    return <div className={cx(cls)}>{text}</div>;
  };


  const filters = useMemo(() => {
    return {
      status: searchParams.get('status') || 'Tất Cả',
      area: searchParams.get('area') || 'Tất Cả',
    };
  }, [searchParams]);

  const handleFilterChange = (newFilters) => {
    setSearchParams(newFilters);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const filteredUsers = listUser.filter((item) => {
    if (item.roll?.toLowerCase() === 'admin') return false;

    const matchStatus =
     filters.status === 'block'
        ? item.roll === 'block'
        : true;

    const matchArea = filters.area === 'Tất Cả' || item.area === filters.area;

    const matchSearch = [item.name, item.email].some((val) =>
      (val || '').toLowerCase().includes(search),
    );

    return matchStatus && matchArea && matchSearch;
  });


  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  useEffect(() => {
    function updateProductsPerPage() {
      const width = window.innerWidth;
      if (width <= 576 || width >= 993) {
        setProductsPerPage(8);
      } else {
        setProductsPerPage(10);
      }
    }
    updateProductsPerPage();
    window.addEventListener('resize', updateProductsPerPage);
    return () => window.removeEventListener('resize', updateProductsPerPage);
  }, []);
  const totalPages = Math.ceil(filteredUsers.length / productsPerPage);

 
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentData = filteredUsers.slice(indexOfFirst, indexOfLast);

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

  // ✅ Search history
  const [keyword, setKeyword] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const HISTORY_KEY = 'searchHistory_sell';
  const navigate = useNavigate();

  const handleFocus = () => {
    const stored = localStorage.getItem(HISTORY_KEY);
    const history = stored ? JSON.parse(stored) : [];
    setSearchHistory(history);
    setShowHistory(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowHistory(false), 150);
  };

  const clearSearchHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
    setSearchHistory([]);
  };

  const deleteHistoryItem = (indexDel) => {
    const newHistory = searchHistory.filter((_, i) => i !== indexDel);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    setSearchHistory(newHistory);
  };

  const saveToSearchHistory = (keyword) => {
    let history = [...searchHistory];
    keyword = keyword.trim();
    if (!keyword) return;

    history = history.filter((item) => item.toLowerCase() !== keyword.toLowerCase());

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
      navigate(`/ManagerUser?search=${encodeURIComponent(keyword.trim())}`);
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

  useEffect(() => {
    const clearSearch = () => setKeyword('');
    window.addEventListener('clearSearch', clearSearch);
    return () => {
      window.removeEventListener('clearSearch', clearSearch);
    };
  }, []);

  return (
    <div className={cx('container')}>
      {/* Bộ lọc */}
      <div className={cx('find')}>
        <Select
          data={listSelect[6]}
          value={filters.status || 'Tất Cả'}
          onChange={(value) =>
            handleFilterChange({ status: value || 'Tất Cả', area: filters.area })
          }
        />
        <Select
          data={listSelect[1]}
          value={filters.area || 'Tất Cả'}
          onChange={(value) =>
            handleFilterChange({ status: filters.status, area: value || 'Tất Cả' })
          }
        />
        {/* Ô search */}
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
                      navigate(`/ManagerUser?search=${encodeURIComponent(item)}`);
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

      {/* Danh sách */}
      <div>
        <>
          <div className={cx('title')}>
            <div className={cx('banner')}>
              <h3>Danh Sách Người Dùng</h3>
            </div>
            <div className={cx('menu')}>
              <div className={cx('infomenu')}>
                <p className={cx('name')}>Tên Người Dùng</p>
                <p className={cx('address')} >Email</p>
              </div>
              <div className={cx('infoendmenu')}>
                <p className={cx('namestore')}>Địa Chỉ</p>
                <p className={cx('interface')}>Trạng Thái</p>
              </div>
            </div>
          </div>

          {currentData.map((item, index) => (
            <div key={item.id} className={cx('itemManager')}>
                <div className={cx('infostart')}>
                   <div className={cx('imgAvatar')}>
                <img src={item.avatar} alt="" />
                <p>{item.name}</p>
              </div>
               
             
              <div className={cx('info')}>         
                <p>{item.email}</p>
              </div>
               </div>
              <div className={cx('infoend')}>
                <div className={cx('display')}>
                  <p>{item.address}</p>
                </div>
                <div className={cx('icon')}>
                  <div className={cx('status')}>{viewUser(item.roll)}</div>
                  <div className={cx('iconaction')}>
                    <FontAwesomeIcon
                      icon={hover === `user-${index}` ? faEyeSlash : faEye}
                      className={cx('iconEye')}
                      onMouseEnter={() => setHover(`user-${index}`)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() =>
                        item.roll === 'block'
                          ? setShowUnblockFormUser(true)
                          : setShowReportForm(true)
                      }
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={cx('delete')}
                      onClick={() => setShowDeleteForm(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>

        {/* Modal user */}
        {showDeleteForm && (
          <div className={cx('modalOverlay')}>
            <div className={cx('modalContent')}>
              <FormApprove
                data={reportForm[4]}
                onClose={() => setShowDeleteForm(false)}
                form
              />
            </div>
          </div>
        )}
        {showReportForm && (
          <div className={cx('modalOverlay')}>
            <div className={cx('modalContent')}>
              <FormApprove
                data={reportForm[5]}
                onClose={() => setShowReportForm(false)}
                form
              />
            </div>
          </div>
        )}
        {showUnblockFormUser && (
          <div className={cx('modalOverlay')}>
            <div className={cx('modalContent')}>
              <FormApprove
                data={reportForm[9]}
                onClose={() => setShowUnblockFormUser(false)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
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
