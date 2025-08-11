import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './RatingSelect.module.scss';

const cx = classNames.bind(styles);

function RatingSelect({ onChange }) {
    const [selected, setSelected] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleSelect = (value) => {
        setSelected(value);
        if (onChange) {
            onChange(value);
        }
    };

    const renderStars = (count) =>
        Array.from({ length: count }).map((_, idx) => (
            <FontAwesomeIcon key={idx} icon={faStar} className={cx('star')} />
        ));

    return (
        <>
            <div
                className={cx('wrapper')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={cx('dropdown')}>
                    <span>{selected ? renderStars(selected) : 'Đánh giá'}</span>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={cx('icon')}
                    />
                </div>

                {isHovered && (
                    <ul className={cx('menu')}>
                        {[5, 4, 3, 2, 1].map((starCount) => (
                            <li
                                key={starCount}
                                onClick={() => handleSelect(starCount)}
                            >
                                {renderStars(starCount)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default RatingSelect;
