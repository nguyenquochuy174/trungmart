import classNames from 'classnames/bind';
import styles from './FormApprove.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RatingSelect from '../RatingSelect/RatingSelect';

const cx = classNames.bind(styles);

function FormApprove({ data, onClose,form=false }) {
    const inputRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [ratingValue, setRatingValue] = useState(null);

    const handleFocusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleRatingChange = (value) => {
        setRatingValue(value);
    };

    const handleConfirm = () => {
        let message = 'Vui lòng nhập nội dung trước khi xác nhận.';
        // giá trị của icon bên mock-data là true nên đây cần phủ định lại để kiểm tra
        if (!data.icon) {
            message =
                'Vui lòng nhập nội dung hoặc chọn sao trước khi xác nhận.';
        }
        if (!inputValue.trim() && (ratingValue === null || ratingValue === 0)) {
            setError(message);
        } else {
            setError('');
            toast.success(data.title + ' thành công!', {
                position: 'top-right',
                autoClose: 2000,
            });
            setInputValue('');
            setRatingValue(null);
        }
    };

    const handleCancel = () => {
        setInputValue('');
        setError('');
        if (onClose) onClose();
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 576);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className={cx('form')}>
                {data.icon && (
                    <FontAwesomeIcon
                        icon={data.icon}
                        className={cx('iconReport')}
                    />
                )}
                <h2>{data.title}</h2>
           {form  && (
                <div className={cx('textarea')}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Nhập nội dung vào đây..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <FontAwesomeIcon
                        onClick={handleFocusInput}
                        icon={faPen}
                        className={cx('iconPen')}
                    />
                </div>
            )}
                {error && <p className={cx('errorMessage')}>{error}</p>}

                {data.description && (
                    <p className={cx('description')}>
                        {data.description.split('.').map((sentence, index) =>
                            sentence.trim() ? (
                                <span key={index}>
                                    {sentence.trim()}.
                                    <br />
                                </span>
                            ) : null,
                        )}
                    </p>
                )}

                {data.star && (
                    <div className={cx('ratingSelect')}>
                        <p>Chọn sao: </p>
                        <RatingSelect
                            value={ratingValue}
                            onChange={handleRatingChange}
                        />
                    </div>
                )}

                <div className={cx('form-btn')}>
                    <Button primary small={isMobile} onClick={handleConfirm}>
                        Xác Nhận
                    </Button>
                    <Button outline small={isMobile} onClick={handleCancel}>
                        Hủy
                    </Button>
                </div>
            </div>
            <ToastContainer className={cx('toastMessage')} />
        </>
    );
}

export default FormApprove;
