import classNames from 'classnames/bind';
import styles from './ManagerSell.module.scss';
import FormApprove from '~/components/FormApprove/FormApprove';
import { storeList, reportForm, listinfoSell, listSelect } from '~/constant/mock-data';
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
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Select from '~/components/Select/Select';

const cx = classNames.bind(styles);

function ManagerUser() {
  const [hover, setHover] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = (searchParams.get('search') || '').toLowerCase();



  // Modal state
  const [showDeleteFormstore, setShowDeleteFormstore] = useState(false);
  const [showReportFormstore, setShowReportFormstore] = useState(false);
  const [showUnblockFormstore, setShowUnblockFormstore] = useState(false);


  // map status
   const statusMapStore = {
    cancelled: ['sell', 'Chưa Duyệt'],
    block: ['block', 'Khóa'],
    approved: ['user', 'Hoạt Động']
  };

   const viewStore = (store) => {
    const [cls, text] = statusMapStore[store.status] || ['user', 'Hoạt Động'];
    return <div className={cx(cls)}>{text}</div>;
  };


  const storeUser = (id) => {
    const store = listinfoSell.find((item) => item.idstore === id);
    return store ? store.LastName + ' ' + store.Name : '';
  };

  // ✅ Lấy filters từ URL
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

  const filteredStores = storeList.filter((item) => {
    const matchStatus =
      filters.status === 'cancelled'
        ? item.status === 'cancelled'
        : filters.status === 'block'
          ? item.status === 'block'
          : filters.status === 'approved'
            ? item.status === 'approved'
            : true;

    const matchArea = filters.area === 'Tất Cả' || item.area === filters.area;

    const matchSearch =
      [item.name, item.address, storeUser(item.id)].some((val) =>
        (val || '').toLowerCase().includes(search)
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
  const totalPages = Math.ceil(filteredStores.length / productsPerPage);
 
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentData = filteredStores.slice(indexOfFirst, indexOfLast);

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
  const HISTORY_KEY = 'searchHistory_sell';//key dùng để lưu lịch sử tìm kiếm trong localStorage.
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

    history = history.filter((item) => item.toLowerCase() !== keyword.toLowerCase());//Tránh trùng lặp (so sánh không phân biệt hoa thường).

    history.unshift(keyword);// đưa từ khóa mới lên đầu

    if (history.length > 10) {
      history = history.slice(0, 10);// chỉ giữ tối đa 10 mục
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    setSearchHistory(history);
  };
  /**
   * trim() → loại bỏ khoảng trắng thừa.
      Nếu từ khóa rỗng → return, không lưu.
      Loại bỏ trùng lặp (không phân biệt chữ hoa/thường).
      Thêm từ khóa mới lên đầu mảng → luôn hiển thị từ khóa mới nhất ở trên.
      Giới hạn 10 mục gần nhất.
      Lưu vào localStorage và cập nhật state.
   */

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
      handleSearch(); //Nhấn Enter cũng kích hoạt tìm kiếm.
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
          data={listSelect[7]}
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
            onChange={(e) => setKeyword(e.target.value)} //Input nhận giá trị từ keyword.
            onFocus={handleFocus} //Khi focus → hiển thị lịch sử.
            /**Người dùng click vào input → hàm handleFocus chạy.

              Lấy lịch sử tìm kiếm từ localStorage.
              Nếu có dữ liệu → parse JSON thành mảng.
              Nếu chưa có dữ liệu → tạo mảng rỗng.
              Cập nhật searchHistory state.
              Đặt showHistory = true để hiển thị danh sách lịch sử bên dưới input. */
            onBlur={handleBlur}
            /**
             * Khi input mất focus, showHistory sẽ thành false, ẩn danh sách lịch sử.
                setTimeout(150ms) là để:
                Nếu người dùng click vào một item trong lịch sử → click vẫn được xử lý trước khi danh sách ẩn.
             */
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
                      //Nhấn nút X xóa mục lịch sử.
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
                <h3>Danh Sách Cửa Hàng</h3>
              </div>
              <div className={cx('menu')}>
                <div className={cx('infomenu')}>
                  <p className={cx('name')}>Tên Cửa Hàng</p>
                  <p className={cx('address')}>Địa Chỉ</p>
                </div>
                <div className={cx('infoendmenu')}>
                  <p className={cx('namestore')}>Tên Chủ Cửa hàng</p>
                  <p className={cx('interface')}>Trạng Thái</p>
                </div>
              </div>
            </div>

          {currentData.map((item, index) => (
            <Link to={`/StoreAdmin/${item.id}`} key={item.id}>
                <div className={cx('itemManager')}>
                  <div className={cx('infostart')}>
                  <div className={cx('imgAvatar')}>
                    <img src={item.avatar} alt="" />
                     <p>{item.name}</p>
                  </div>
                  <div className={cx('info')}>
                    <p>{item.address}</p>
                  </div>
                  </div>
                  
                  <div className={cx('infoend')}>
                    <div className={cx('display')}>
                      <p>{storeUser(item.id)}</p>
                    </div>
                    <div className={cx('icon')}>
                      <div className={cx('status')}>{viewStore(item)}</div>
                      <div className={cx('iconaction')}>
                        <FontAwesomeIcon
                          icon={hover === `store-${index}` ? faEyeSlash : faEye}
                          className={cx('iconEye')}
                          onMouseEnter={() => setHover(`store-${index}`)}
                          onMouseLeave={() => setHover(null)}
                          onClick={(e) => {
                            e.preventDefault();
                            item.status === 'block'
                              ? setShowUnblockFormstore(true)
                              : setShowReportFormstore(true);
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={cx('delete')}
                          onClick={(e) => {
                            e.preventDefault();
                            setShowDeleteFormstore(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
          ))}
        </>

        {/* Modal user */}
        {showDeleteFormstore && (
          <div className={cx('modalOverlay')}>
            <div className={cx('modalContent')}>
              <FormApprove
                data={reportForm[6]}
                onClose={() => setShowDeleteFormstore(false)}
                form
              />
            </div>
          </div>
        )}
        {showReportFormstore && (
          <div className={cx('modalOverlay')}>
            <div className={cx('modalContent')}>
              <FormApprove
                data={reportForm[7]}
                onClose={() => setShowReportFormstore(false)}
                form
              />
            </div>
          </div>
        )}
        {showUnblockFormstore && (
          <div className={cx('modalOverlay')}>
            <div className={cx('modalContent')}>
              <FormApprove
                data={reportForm[8]}
                onClose={() => setShowUnblockFormstore(false)}
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
