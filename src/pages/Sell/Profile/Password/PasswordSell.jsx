import styles from "./PasswordSell.module.scss"
import classNames from "classnames/bind";
import { listinfoSell } from "~/constant/mock-data";
import Button from '~/components/Button/Button';
const cx = classNames.bind(styles);
function PasswordSell() {
    return (
    <div className={cx('container')}>
        <div className={cx('content')}>
            <div className={cx("userPass")}>
                <p className={cx("pass")}>Nhập mật khẩu hiện tại: </p>
                <input
                type="text"
                className={cx("inputPass")}
                name="name"
                placeholder="Nhập mật khẩu cũ"
                />
            </div>
            <div className={cx("userPass")}>
                <p className={cx("pass")}>Nhập mật mới: </p>
                <input
                type="text"
                className={cx("inputPass")}
                name="name"
                placeholder="Nhập mật khẩu mới"
                />
            </div>
            <div className={cx("userPass")}>
                <p className={cx("pass")}>Nhập mật lại mật khẩu mới: </p>
                <input
                type="text"
                className={cx("inputPass")}
                name="name"
                placeholder="Nhập mật lại mật khẩu mới"
                />
            </div>
            <div className={cx('Submit')} >
                    <Button primary large >
                                    Lưu thay đổi
                    </Button>
            </div>
        </div>
          
    </div>
    );
}
export default PasswordSell;