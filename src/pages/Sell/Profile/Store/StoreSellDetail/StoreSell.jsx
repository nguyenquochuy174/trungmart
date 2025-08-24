import styles from "./StoreSell.module.scss"
import classNames from 'classnames/bind';
import { storeList } from '~/constant/mock-data';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPen,
  faUserCheck,
  faStar,
  faBox
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function StoreSell() {
  const [storeInfo, setStoreInfo] = useState(null);
  const idsell = parseInt(localStorage.getItem('idSell'));

  useEffect(() => {
    const info = storeList.find((store) => store.id === idsell);
    setStoreInfo(info);
  }, [idsell]);

  // Nếu chưa có dữ liệu thì không render gì
  if (!storeInfo) {
    return <div className={cx('container')}>Đang tải...</div>;
  }

  const joinYear = new Date(storeInfo.joinedAt).getFullYear();
  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - joinYear;

  return (
    <div className={cx("container")}>
      <div>
        <div className={cx("contentHeader")}>
          <div className={cx("item")}>
            <div className={cx('headeritem')}>
              <FontAwesomeIcon icon={faBox} className={cx("icon")} />
              <p>Sản Phẩm</p>
            </div>
            <p>100</p>
          </div>
          <div className={cx("item")}>
            <div className={cx('headeritem')}>
              <FontAwesomeIcon icon={faStar} className={cx("icon")} />
              <p>Đánh Giá</p>
            </div>
            <p>{storeInfo.rating} ({storeInfo.totalReviews})</p>
          </div>
          <div className={cx("item")}>
            <div className={cx('headeritem')}>
              <FontAwesomeIcon icon={faUserCheck} className={cx("icon")} />
              <p>Tham Gia</p>
            </div>
            <p>{yearsActive} năm</p>
          </div>
        </div>

        {/* thông tin cửa hàng */}
        <div className={cx('box')}>
          <div className={cx('contentedit')}>
            <h3>Thông tin hồ sơ</h3>
            <a href="/StoreSellEdit">
              <FontAwesomeIcon icon={faPen} className={cx('icon')} />
              Chỉnh sửa
            </a>
          </div>

          <div className={cx('info')}>
            <div className={cx('Namestore')}>
              <div className={cx('Name')}>
                <p>Tên cửa hàng</p>
                <p>{storeInfo.name}</p>
              </div>
              <div className={cx('Name')}>
                <p>Địa chỉ</p>
                <p>{storeInfo.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* phương thức liên lạc */}
        <div className={cx('box')}>
          <div className={cx('contentedit')}>
            <h3>Phương thức liên lạc</h3>
          </div>
          <div className={cx('info')}>
            <div className={cx('Namestore')}>
              <div className={cx('Name')}>
                <p>Email</p>
                <p>{storeInfo.email}</p>
              </div>
              <div className={cx('Name')}>
                <p>Điện thoại</p>
                <p>{storeInfo.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* thông tin khác */}
        <div className={cx('box')}>
          <div className={cx('contentedit')}>
            <h3>Thông tin khác</h3>
          </div>
          <div className={cx('info')}>
            <div className={cx('Namestore')}>
              <div className={cx('Name')}>
                <p>Facebook</p>
                <p>{storeInfo.fanpage}</p>
              </div>
              <div className={cx('Name')}>
                <p>Website</p>
                <p>{storeInfo.website}</p>
              </div>
            </div>
            <div className={cx('imgStore')}>
              <p>Ảnh cửa hàng</p>
              <img src={storeInfo.avatar} alt="store avatar" />
            </div>
          </div>
        </div>

        {/* giới thiệu cửa hàng */}
        <div className={cx('box')}>
          <div className={cx('contentedit')}>
            <h3>Giới thiệu cửa hàng</h3>
          </div>
          <div className={cx('info')}>
            <div className={cx('InfoStore')}>
              <div className={cx('infoStoreread')}>
                <p>{storeInfo.description}</p>
              </div>

              <div className={cx('infoStoreread')}>
                <b>Sản phẩm nổi bật tại {storeInfo.name}</b>
                {storeInfo.featuredProducts?.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>

              <div className={cx('infoStoreread')}>
                <b>Tại sao chọn {storeInfo.name}</b>
                <p>{storeInfo.guarantee.ingredients}</p>
                <p>{storeInfo.guarantee.quality}</p>
                <p>{storeInfo.guarantee.refund}</p>
              </div>

              <div className={cx('infoStoreread')}>
                <b>Thông tin liên hệ</b>
                <p>Địa chỉ: {storeInfo.address}</p>
                <p>Số điện thoại: {storeInfo.phone}</p>
                <p>Website: {storeInfo.website}</p>
                <p>Fanpage: {storeInfo.fanpage}</p>
              </div>
            </div>
          </div>
        </div>

        {/* giấy chứng nhận */}
        <div className={cx('box')}>
          <div className={cx('contentedit')}>
            <h3>Giấy chứng nhận</h3>
          </div>
          <div className={cx('info')}>
            <div className={cx('imgStoreaccept')}>
              {storeInfo.certifications?.map((cert) => (
                <img key={cert.id} src={cert.url} alt={cert.alt} className={cx('certificateImg')} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreSell;
