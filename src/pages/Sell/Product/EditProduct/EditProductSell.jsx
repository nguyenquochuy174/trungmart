
import styles from "./EditProductSell.module.scss"
import classNames from 'classnames/bind';
import { listMenuUser,storeList,listProduct } from '~/constant/mock-data';
import Button from '~/components/Button/Button';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Select from "react-select";
import { Link } from 'react-router-dom';
import { 
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function AddProductSell() {
  const [bank, setBank] = useState('');
  const { id } = useParams();
  
  const [storeInfo, setStoreInfo] = useState(null);
  const [product, setProduct] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
    const numericId = parseInt(id, 10); 
  const idsell = parseInt(localStorage.getItem('idSell'));
  useEffect(() => {
    const info = storeList.find((store) => store.id === idsell);
    setStoreInfo(info);
  }, [idsell]);
  // lấy sản phẩm
  useEffect(() => {
    const info = listProduct.find((product) => product.id === numericId);
    setProduct(info);
  }, [numericId]);

  useEffect(()=>{
    if(product && product.image && product.image.length>0){
    setAvatarPreview(product.image[0].url)

    }
  },[product])
  const options = listMenuUser[1].children.map(item => ({
    value: item.name,
    label: (
      <div className={cx('selectBank')}>
        <span>{item.name}</span>
      </div>
    ),
    queryKey: item.queryKey
  }));



  if (!storeInfo) {
    return <div className={cx('container')}>Đang tải...</div>;
  }

  return (
    <div className={cx("container")}>
      <div className={cx('contentedit')}>
        <h3>Chỉnh Sửa Sản Phẩm</h3>
      </div>
      <div className={cx('content')}>
        <div className={cx('inputedit')}>
          <div className={cx("userName")}>
            <p className={cx("editinfo")}>Tên Sản Phẩm: </p>
            <input
              type="text"
              className={cx("Edit")}
              name="Tên Sản Phẩm"
               defaultValue={product.name}
         
            />
          </div>
          <div className={cx("userName")}>
            <p className={cx("editinfo")}>Số Lượng: </p>
            <input
              type="text"
              className={cx("Edit")}
              name="Số Lượng"
              defaultValue={product.quantity}
              
            />
          </div>
        </div>
        <div className={cx('inputedit')}>
          <div className={cx("userName")}>
            <p className={cx("editinfo")}>Giá: </p>
            <input
              type="text"
              className={cx("Edit")}
              name="Giá"
            defaultValue={product.price}
            />   
          </div>
          <div className={cx("userName")}>
            <p className={cx("editinfo")}>Danh Mục: </p>
            <Select
              options={options|| product.area}
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
            name="Giới Thiệu Cửa Hàng"
            defaultValue={product.description}

            
          />
        </div>
        <div className={cx("userAnh")}>
          <p className={cx("editinfo")}>Ảnh đại diện: </p>
          <div className={cx('imgAvatar')}>
              <img src={avatarPreview} alt="Ảnh đại diện" />
                    <input
                        type="file"
                        id="fileInput"
                        className={cx('file-input')}
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const imageUrl = URL.createObjectURL(file);
                                setAvatarPreview(imageUrl);
                            }
                        }}
                    />
                    <label
                        htmlFor="fileInput"
                        className={cx('custom-file-label')}
                    >
                        Chọn tệp
                    </label>
          </div>
        </div>
        <div className={cx('Submit')}>
          <Button primary large style={{ width: '50%' }} >
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