import classNames from 'classnames/bind';
import styles from './SliderBar.module.scss';
import { listSidebarProfileSell, listinfoSell } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function SidebarProfile({ onLinkClick }) {
    const idSell = Number(localStorage.getItem('idSell'));
    const user = listinfoSell.find((item) => item.id === idSell);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className={cx('container')}>
            {user && ( // chỉ render nếu user tồn tại
                <div className={cx('profile')}>
                    <img src={user.Avatar} alt="" />
                    <div className={cx('content')}>
                        <p className={cx('name')}>{user.Name}</p>
                        <p className={cx('email')}>{user.Email}</p>
                    </div>
                </div>
            )}

            <div className={cx('list-info')}>
                <ul>
                    {listSidebarProfileSell.map((item) => (
                        <li key={item.id} className={cx('listItem')}>
                            <Link
                                to={item.path}
                                className={cx('link', {
                                    active: isActive(item.path),
                                })}
                                onClick={() => {
                                    // xử lý đóng sidebar khi click trên mobile
                                    if (window.innerWidth <= 576 && onLinkClick) {
                                        onLinkClick();
                                    }

                                    // xử lý riêng cho logout
                                    if (item.name === 'Đăng xuất') {
                                        localStorage.removeItem('idSell'); 
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={item.icon} />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default SidebarProfile;
