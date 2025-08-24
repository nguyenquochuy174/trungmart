import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfilePassword.module.scss';
import Button from '~/components/Button/Button';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function ProfilePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!oldPassword) {
            setError('Vui lòng nhập mật khẩu hiện tại.');
            toast.error('Vui lòng nhập mật khẩu hiện tại!');
            return;
        }

        if (!newPassword || !reNewPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không được để trống.');
            toast.error('Vui lòng nhập đầy đủ mật khẩu mới!');
            return;
        }

        if (newPassword !== reNewPassword) {
            setError('Mật khẩu mới và nhập lại mật khẩu không trùng khớp.');
            toast.error('Mật khẩu không trùng khớp!');
            return;
        }

        if (oldPassword === newPassword) {
            setError('Mật khẩu mới không được trùng với mật khẩu hiện tại.');
            toast.error('Mật khẩu mới phải khác mật khẩu hiện tại!');
            return;
        }

        setError('');
        toast.success('Mật khẩu đã được cập nhật!');
    };

    return (
        <div className={cx('container')}>
            <div className={cx('form')}>
                <label htmlFor="oldPass">Nhập mật khẩu hiện tại:</label>
                <input
                    id="oldPass"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại ..."
                />
            </div>
            <div className={cx('form')}>
                <label htmlFor="newPass">Nhập mật khẩu mới:</label>
                <input
                    id="newPass"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới ..."
                />
            </div>
            <div className={cx('form')}>
                <label htmlFor="reNewPass">Nhập lại mật khẩu mới:</label>
                <input
                    id="reNewPass"
                    type="password"
                    value={reNewPassword}
                    onChange={(e) => setReNewPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới ..."
                />
            </div>
            {error && <p className={cx('error')}>{error}</p>}
            <Button primary onClick={handleSubmit}>
                Lưu thay đổi
            </Button>

            <ToastContainer position="top-right" autoClose={1500} />
        </div>
    );
}

export default ProfilePassword;
