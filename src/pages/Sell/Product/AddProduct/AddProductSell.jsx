
import styles from "./AddProductSell.module.scss"
import classNames from 'classnames/bind';
import { listMenuUser,storeList } from '~/constant/mock-data';
import Button from '~/components/Button/Button';
import { useState,useEffect } from 'react';
import Select from "react-select";
import { Link } from 'react-router-dom';
import { 
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function AddProductSell() {
  const [bank, setBank] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [storeInfo, setStoreInfo] = useState(null);

  const idsell = parseInt(localStorage.getItem('idSell'));
  useEffect(() => {
    const info = storeList.find((store) => store.id === idsell);
    setStoreInfo(info);
  }, [idsell]);

  const options = listMenuUser[1].children.map(item => ({
    value: item.name,
    label: (
      <div className={cx('selectBank')}>
        <span>{item.name}</span>
      </div>
    ),
    queryKey: item.queryKey
  }));

  const handleSave = () => {
    // Kiểm tra tất cả các trường đã điền chưa
    if (!productName || !quantity || !price || !bank || !description) {
      alert('Vui lòng điền đầy đủ thông tin trước khi lưu!');
      return;
    }
    // Nếu đầy đủ, thực hiện lưu
    console.log({ productName, quantity, price, bank, description });
    alert('Lưu thành công!');
  }

  if (!storeInfo) {
    return <div className={cx('container')}>Đang tải...</div>;
  }

  return (
    <div className={cx("container")}>
      <div className={cx('contentedit')}>
        <h3>Thêm Sản Phẩm</h3>
      </div>
      <div className={cx('content')}>
        <div className={cx('inputedit')}>
          <div className={cx("userName")}>
            <p className={cx("editinfo")}>Tên Sản Phẩm: </p>
            <input
              type="text"
              className={cx("Edit")}
              value={productName}
              onChange={e => setProductName(e.target.value)}
            />
          </div>
          <div className={cx("userName")}>
            <p className={cx("editinfo")}>Số Lượng: </p>
            <input
              type="text"
              className={cx("Edit")}
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className={cx('inputedit')}>
          <div className={cx("userName")}>
            <p className={cx("editinfo")}>Giá: </p>
            <input
              type="text"
              className={cx("Edit")}
              value={price}
              onChange={e => setPrice(e.target.value)}
            />   
          </div>
          <div className={cx("userName")}>
            <p className={cx("editinfo")}>Danh Mục: </p>
            <Select
              options={options}
              value={options.find(op => op.value === bank)}
              onChange={(op) => setBank(op.value)}
            />
          </div>
        </div>
        <div className={cx("userStore")}>
          <p className={cx("editinfo")}>Giới Thiệu Cửa Hàng: </p>
          <input
            type="text"
            className={cx("desEdit")}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className={cx("userAnh")}>
          <p className={cx("editinfo")}>Ảnh đại diện: </p>
          <div className={cx('imgAvatar')}>
            <img src={storeInfo.avatar} alt="" />
            <Button outline large>
              Chọn ảnh
            </Button>
          </div>
        </div>
        <div className={cx('Submit')}>
          <Button primary large style={{ width: '50%' }} onClick={handleSave}>
            Lưu
          </Button>
        <Link to="/ProductSell" style={{ width: '50%' }}>
        <Button outline large style={{ width: '100%' }}>
            Hủy
        </Button>
        </Link>

        </div>
      </div>
    </div>
  );
}


export default AddProductSell;