import classNames from 'classnames/bind';
import styles from './Introduce.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Introduce() {
    return (
        <div className={cx('introduce')}>
            <h2 className={cx('introduce-title')}>
                Giới thiệu về nền tảng Đặc sản Miền Trung
            </h2>
            <p className={cx('introduce-slogan')}>
                Kết nối - Chất lượng - Uy tín
            </p>

            <ol className={cx('introduce-list')}>
                <li>
                    <strong>Sứ mệnh &amp; Tầm nhìn</strong>
                    <p>
                        <b>TrungMart</b> là nền tảng giúp kết nối các cửa hàng
                        bán đặc sản chính gốc miền Trung với người tiêu dùng
                        trên toàn quốc.
                    </p>
                    <ul>
                        <li>
                            <b>Sứ mệnh:</b> Mang đặc sản quê hương đến mọi nhà.
                        </li>
                        <li>
                            <b>Tầm nhìn:</b> Trở thành sàn thương mại điện tử
                            dẫn đầu về đặc sản vùng miền Việt Nam.
                        </li>
                    </ul>
                </li>

                <li>
                    <strong>Lợi ích cho người dùng</strong>
                    <ul>
                        <li>
                            <b>Người mua:</b> Dễ dàng tìm kiếm đặc sản thật -
                            chính gốc - an toàn.
                        </li>
                        <li>
                            <b>Người bán:</b> Mở shop online nhanh chóng, tiếp
                            cận hàng ngàn khách hàng.
                        </li>
                    </ul>
                </li>

                <li>
                    <strong>Quy định chung</strong>
                    <ol type="a">
                        <li>
                            <b>Đối với người mua</b>
                            <ul>
                                <li>
                                    Không spam, lừa đảo hay đánh giá sai sự
                                    thật.
                                </li>
                                <li>
                                    Tuân thủ các thông tin chính xác khi mua
                                    hàng.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <b>Đối với người bán</b>
                            <ul>
                                <li>
                                    Cung cấp sản phẩm chất lượng và nguồn gốc rõ
                                    ràng.
                                </li>
                                <li>
                                    Không trễ giao hàng, không bán hàng giả.
                                </li>
                            </ul>
                        </li>
                    </ol>
                </li>

                <li>
                    <strong>Xử lý vi phạm</strong>
                    <ul>
                        <li>Lần đầu: Cảnh báo.</li>
                        <li>Tái phạm: Khoá tài khoản tạm thời.</li>
                        <li>Vi phạm nghiêm trọng: Xoá tài khoản vĩnh viễn.</li>
                    </ul>
                </li>

                <li>
                    <strong>Liên hệ hỗ trợ</strong>
                    <ul>
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} />{' '}
                            trungmartshop75@gmail.com
                        </li>
                        <li>
                            {' '}
                            <FontAwesomeIcon icon={faPhone} /> 0367376403
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
    );
}

export default Introduce;
