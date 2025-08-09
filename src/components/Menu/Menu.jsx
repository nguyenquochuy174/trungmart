import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const Menu = ({ data }) => {
    return (
        <ul className={cx('listMenu')}>
            {data.map((item, index) => (
                <li
                    key={index}
                    className={cx('listItem', { hasChildren: item.children })}
                >
                    <a href={item.path}>
                        {item.name}
                        {item.children && (
                            <FontAwesomeIcon icon={faAngleDown} />
                        )}
                    </a>

                    {item.children && (
                        <ul className={cx('dropdownMenu')}>
                            {item.children.map((child, childIndex) => (
                                <li key={childIndex}>
                                    <a href={child.path}>{child.name}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export { Menu };
