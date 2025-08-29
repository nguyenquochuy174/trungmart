import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listUser,listinfoSell } from '~/constant/mock-data';
const cx = classNames.bind(styles);

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [accountType, setAccountType] = useState('user');// loại tài khoản (khách hàng / chủ cửa hàng) khi đăng ký
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleToggle = (value) => {
        setIsRegister(value === 'register');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const id = parseInt(userId);

        const user = listUser.find(
            (user) => user.id === id && user.password === password,
        );
         const sell = listinfoSell.find(
            (sell) => sell.id === id && sell.password === password,
        );
        // code kiểm tra tk đn sell
       if (!user && !sell) {
            setError('Thông tin đăng nhập không đúng!');
            return;
        }
        if(sell){
            localStorage.setItem('idSell', sell.id);
            setError('');
            navigate('/ProductSell');
        }else if (user.roll === 'admin') {
            localStorage.setItem('idAd', user.id);
            setError('');
            navigate('/StatisAdmin');
        }else{
                localStorage.setItem('userId', user.id);
                setError('');
                navigate('/UserHome');
            }
            
        } 
    return (
        <div className={cx('container')}>
            <h2 className={cx('title')}>TrungMart</h2>

            <div className={cx('select')}>
                <p
                    className={!isRegister ? cx('active') : ''}
                    onClick={() => handleToggle('login')}
                >
                    Đăng nhập
                </p>
                <p
                    className={isRegister ? cx('active') : ''}
                    onClick={() => handleToggle('register')}
                >
                    Đăng ký
                </p>
            </div>

            <form className={cx('form')} onSubmit={handleLogin}>
                {isRegister && (
                    <div className={cx('radio-group')}>
                        <label>
                            <input
                                type="radio"
                                name="accountType"
                                value="user"
                                checked={accountType === 'user'}
                                onChange={() => setAccountType('user')}
                            />
                            Khách hàng
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="accountType"
                                value="store"
                                checked={accountType === 'store'}
                                onChange={() => setAccountType('store')}
                            />
                            Chủ cửa hàng
                        </label>
                    </div>
                )}

                <label htmlFor="email">Số điện thoại/ email</label>
                <input
                    id="email"
                    type="text"
                    placeholder="Nhập số điện thoại/ email"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />

                {isRegister && (
                    <>
                        <label htmlFor="name">Họ và tên</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Nhập họ tên . . ."
                        />

                        {accountType === 'store' && (
                            <>
                                <label htmlFor="storeName">Tên cửa hàng</label>
                                <input
                                    id="storeName"
                                    type="text"
                                    placeholder="Nhập tên cửa hàng . . ."
                                />
                                <label htmlFor="storeDesciption">
                                    Mô tả cửa hàng
                                </label>
                                <input
                                    id="storeDescription"
                                    type="text"
                                    placeholder="Nhập mô tả cửa hàng . . ."
                                />
                            </>
                        )}
                    </>
                )}

                {!isRegister && (
                    <>
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu . . ."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className={cx('error')}>{error}</p>}

                        <div className={cx('forgot')}>
                            <a href="/quen-mat-khau">Quên mật khẩu?</a>
                        </div>
                    </>
                )}

                {isRegister && (
                    <>
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu . . ."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="confirm">Nhập lại mật khẩu</label>
                        <input
                            id="confirm"
                            className={cx('confirm')}
                            type="password"
                            placeholder="Nhập lại mật khẩu . . ."
                        />
                    </>
                )}

                <Button primary>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</Button>
            </form>
        </div>
    );
}
export default Login;
