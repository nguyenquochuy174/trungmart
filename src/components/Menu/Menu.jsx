import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Menu = ({ data }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) =>
        currentPath === path || currentPath.startsWith(path + '/');

    return (
        <ul className={cx('listMenu')}>
            {data.map((item, index) => {
                const isParentActive =
                    isActive(item.path) ||
                    (item.children &&
                        item.children.some((child) => isActive(child.path)));

                return (
                    <li
                        key={index}
                        className={cx('listItem', {
                            hasChildren: item.children,
                            active: isParentActive,
                        })}
                    >
                        <Link to={item.path}>
                            {item.name}
                            {item.children && (
                                <FontAwesomeIcon icon={faAngleDown} />
                            )}
                        </Link>

                       {item.children && (
                        <ul className={cx('dropdownMenu')}>
                            {item.children.map((child, childIndex) => (
                            <li
                                key={childIndex}
                                className={cx({
                                active: isActive(child.path),
                                })}
                            >
                                {child.categoryKey ? (
                                <Link to={`/UserProduct?category=${child.categoryKey}`}>
                                    {child.name}
                                </Link>
                                ):(
                                  <Link to={child.path}>
                                    {child.name}
                                </Link>
                                 )}
                            </li>
                            ))}
                        </ul>
                        )}

                    </li>
                );
            })}
        </ul>
    );
};

export { Menu };
