import styles from "./WalletSell.module.scss"
import classNames from 'classnames/bind';
import { listinforWalletSell } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function WalletSell() {
    return (
    <div className={cx('container')}>
        {listinforWalletSell.map(info=>(
            <div key={info.id}>
                <div className={cx('content')}>
                <h3>Ví điện tử cửa hàng</h3>
                <a href="/WalletSellEdit">
                <FontAwesomeIcon icon={faPen} className={cx('icon')} />
                            Chỉnh sửa
                </a>
            </div>
            <div className={cx('info')}>
             <div className={cx('leftInfo')}>
                <div className={cx('leftcontent')}>
                    <div className={cx('Name')}>
                        <p>Họ Và Tên</p>
                        <b>{info.Name}</b>
                    </div>
                    <div className={cx('Name')}>
                        <p>Ngân Hàng</p>
                        <b>{info.Bank}</b>
                    </div>
                       <div className={cx('Name')}>
                        <p>Số Tài Khoản</p>
                        <b>{info.Banknumber}</b>
                    </div>
                </div>
                   
            </div>
            <div className={cx('rightInfo')}>
                <img src={info.imgQR} alt="" />
            </div>
            </div>
            </div>
           
   
        ))}
    </div>
    );
}

export default WalletSell;