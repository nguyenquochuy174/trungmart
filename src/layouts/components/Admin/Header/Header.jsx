import { Menu } from '~/components/Menu/Menu';
import { listMenuAdmin } from '~/constant/mock-data';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    
} from '@fortawesome/free-brands-svg-icons';
import {
    faBell,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/image';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Header() {
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

    return (
        <>
           <div className={cx('container')}>
            <div className={cx('headerTop')}>
                <div className={cx('infoHeader')}>
                    <FontAwesomeIcon
                    icon={faFacebook}
                    className={cx('iconFace')}
                    />
                    <p>For any queries - please contact customer
                            care-0367376403
                    </p>
                </div>
            </div>



            <div className={cx('headerBottom')}>
                <div className={cx('headerContent')}>
                    <div className={cx('logo')}>
                        <img src={images.logo} alt="TrungMart"/>
                    </div>
                    
        
                    <div className={cx('menuIconHeader')}>
                        <ul>
                            <li>
                                <a href="/NotificationAdmin">
                                    <FontAwesomeIcon
                                        icon={faBell}/>
                                </a>
                            </li>
                            <li>
                                <a href="/">
                                    <FontAwesomeIcon
                                        icon={faArrowRightFromBracket}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

           </div>
            <Menu data={listMenuAdmin} />
        </>
    );
}

export default Header;
