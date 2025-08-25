import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Select.module.scss';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Select({ data, onChange }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        const key = data.children?.[0]?.queryKey || '';
        const valueFromUrl = searchParams.get(key);
        setSelectedValue(valueFromUrl ?? null);
    }, [searchParams, data.children]);

    const selectedOption = data.children?.find(
        (child) =>
            (child.value === null && selectedValue === null) ||
            String(child.value) === String(selectedValue),
    );

    const selectedLabel =
        selectedOption?.value === null ? data.name : selectedOption?.label;
    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    const handleChildClick = (queryKey, value) => {
        searchParams.set(queryKey, value);
        setSearchParams(searchParams);
        setSelectedValue(value);
        setIsOpen(false);

        const selectedOption = data.children.find(
            (child) => String(child.value) === String(value),
        );
        if (onChange && typeof onChange === 'function') {
            onChange(selectedOption);
        }
    };

    return (
        <ul className={cx('listSelect')}>
            <li
                className={cx('listItem', { hasChildren: data.children })}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span className={cx('title')}>
                    {selectedLabel || data.name}
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
                                        handleChildClick(
                                            child.queryKey,
                                            child.value,
                                        )
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

export default Select;
