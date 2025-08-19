import classNames from 'classnames/bind';
import styles from './SidebarProfile.module.scss';
import { listSidebarProfileUser, listUser } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function SidebarProfile({ onLinkClick }) {
    const userId = Number(localStorage.getItem('userId'));
    const user = listUser.find((item) => item.id === userId);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    console.log(location.pathname);

    return (
        <div className={cx('container')}>
            <div className={cx('profile')}>
                <img src={user.avatar} alt="" />
                <div className={cx('content')}>
                    <p className={cx('name')}>{user.name}</p>
                    <p className={cx('email')}>{user.email}</p>
                </div>
            </div>
            <div className={cx('list-info')}>
                <ul>
                    {listSidebarProfileUser.map((item) => (
                        <li key={item.id} className={cx('listItem')}>
                            <Link
                                to={item.path}
                                className={cx('link', {
                                    active: isActive(item.path),
                                })}
                                onClick={() => {
                                    if (
                                        window.innerWidth <= 576 &&
                                        onLinkClick
                                    ) {
                                        onLinkClick();
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
