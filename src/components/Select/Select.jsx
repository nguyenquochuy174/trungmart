import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Select.module.scss';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Select({ data }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        const key = data.children?.[0]?.queryKey || '';
        const valueFromUrl = searchParams.get(key);
        setSelectedValue(valueFromUrl ?? null); //Dùng searchParams.get("status") để xem trong URL có sẵn giá trị không 
    }, [searchParams, data.children]);

    const selectedOption = data.children?.find(
        (child) =>
            (child.value === null && selectedValue === null) ||
            String(child.value) === String(selectedValue),
    );
    /**
     * selectedOption = tìm option nào có value trùng với selectedValue.
            Nếu selectedValue = null thì hiển thị nhãn mặc định (data.name, tức là “Trạng thái”).
            Nếu chọn một option thì hiển thị child.label (ví dụ “Đã giao”).
     */
    const selectedLabel =
        selectedOption?.value === null ? data.name : selectedOption?.label;
    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    const handleChildClick = (queryKey, value) => {
        searchParams.set(queryKey, value); // cập nhật URL param
        setSearchParams(searchParams);// ghi lại param vào URL
        setSelectedValue(value);// cập nhật state hiển thị
        setIsOpen(false);// đóng dropdown
    };

    return (
        <ul className={cx('listSelect')}>
            <li
                className={cx('listItem', { hasChildren: data.children })} 
            //     Nếu data.children tồn tại (truthy, khác null/undefined/[]) thì thêm class hasChildren.
            // Nếu không có data.children → không thêm hasChildren.
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
