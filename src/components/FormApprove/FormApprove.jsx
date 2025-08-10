import classNames from 'classnames/bind';
import styles from './FormApprove.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function FormApprove({ data }) {
    const inputRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

    const handleFocusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // kiểm tra để điều chỉnh size button
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 576);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <div className={cx('form')}>
                <FontAwesomeIcon
                    icon={data.icon}
                    className={cx('iconReport')}
                />
                <h2>{data.title}</h2>
                <div className={cx('textarea')}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Nhập nội dung vào đây..."
                    />
                    <FontAwesomeIcon
                        onClick={handleFocusInput}
                        icon={faPen}
                        className={cx('iconPen')}
                    />
                </div>
                <p>
                    {data.description.split('.').map((sentence, index) =>
                        sentence.trim() ? (
                            <span key={index}>
                                {sentence.trim()}.
                                <br />
                            </span>
                        ) : null,
                    )}
                </p>
                <div className={cx('form-btn')}>
                    <Button primary small={isMobile}>
                        Xác Nhận
                    </Button>
                    <Button outline small={isMobile}>
                        Hủy
                    </Button>
                </div>
            </div>
        </>
    );
}

export default FormApprove;
