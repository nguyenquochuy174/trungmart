import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MethodSelect.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MethodSelect({ data, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const selectedOption = data.children?.find(
        (child) => child.value === selectedValue,
    );

    const selectedLabel = selectedOption?.label || data.name;

    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    const handleChildClick = (value) => {
        setSelectedValue(value);
        setIsOpen(false);

        const option = data.children.find((child) => child.value === value);
        if (onChange) onChange(option);
    };

    return (
        <ul className={cx('listSelect')}>
            <li
                className={cx('listItem', { hasChildren: data.children })}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span className={cx('title')}>
                    {selectedLabel}
                    {data.children && (
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className={cx('iconDown')}
                        />
                    )}
                </span>

                {data.children && isOpen && (
                    <ul className={cx('dropdownMenu')}>
                        {data.children.map((child, index) => (
                            <li key={index}>
                                <button
                                    className={cx('dropdownItem')}
                                    onClick={() =>
                                        handleChildClick(child.value)
                                    }
                                >
                                    {child.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        </ul>
    );
}

export default MethodSelect;
