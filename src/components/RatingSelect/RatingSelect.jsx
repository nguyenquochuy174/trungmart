import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './RatingSelect.module.scss';

const cx = classNames.bind(styles);
function RatingSelect({ value, onChange }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleSelect = (val) => {
        if (val === value) {
            onChange(null);
        } else {
            onChange(val);
        }
        setIsHovered(false);
    };

    const renderStars = (count, highlight = false) =>
        Array.from({ length: count }).map((_, idx) => (
            <FontAwesomeIcon
                key={idx}
                icon={faStar}
                className={cx('star', {
                    highlighted: idx < count && highlight,
                })}
            />
        ));

    return (
        <div
            className={cx('wrapper')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={cx('dropdown')}>
                <span>{value ? renderStars(value, true) : 'Đánh giá'}</span>
                <FontAwesomeIcon icon={faChevronDown} className={cx('icon')} />
            </div>

            {isHovered && (
                <ul className={cx('menu')}>
                    {[5, 4, 3, 2, 1].map((starCount) => (
                        <li
                            key={starCount}
                            onClick={() => handleSelect(starCount)}
                        >
                            {renderStars(starCount, true)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RatingSelect;
