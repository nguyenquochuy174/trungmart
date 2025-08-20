import classNames from 'classnames/bind';
import styles from './Evaluate.module.scss';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Evaluate({ setShowEvaluateForm }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const handleConfirm = () => {
        if (!name.trim() || !phone.trim() || !address.trim()) {
            setError('Vui lòng nhập đầy đủ thông tin.');
        } else {
            setError('');
            toast.success('Thêm địa chỉ thành công!', {
                position: 'top-right',
                autoClose: 2000,
            });
            setName('');
            setPhone('');
            setAddress('');
            setTimeout(() => {
                setShowEvaluateForm(false);
            }, 2000);
        }
    };

    const handleCancel = () => {
        setName('');
        setPhone('');
        setAddress('');
        setError('');
        setShowEvaluateForm(false);
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 576);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('form')}>
                <h2>Nhập thông tin địa chỉ mới</h2>

                <div className={cx('textarea')}>
                    <label htmlFor="name">Họ tên:</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nhập họ tên..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={cx('textarea')}>
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input
                        id="phone"
                        type="text"
                        placeholder="Nhập số điện thoại..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className={cx('textarea')}>
                    <label htmlFor="address">Địa chỉ:</label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Nhập địa chỉ mới..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {error && <p className={cx('errorMessage')}>{error}</p>}

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
        </div>
    );
}

export default Evaluate;
