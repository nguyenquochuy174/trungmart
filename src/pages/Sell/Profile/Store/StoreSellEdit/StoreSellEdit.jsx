
import styles from "./StoreSellEdit.module.scss"
import classNames from 'classnames/bind';
import { storeList } from '~/constant/mock-data';
import Button from '~/components/Button/Button';
import { useState, useEffect } from 'react';
import { 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function StoreSellEdit() {
   const [storeInfo, setStoreInfo] = useState(null);
   const [avatarPreview, setAvatarPreview] = useState(null);
     const idsell = parseInt(localStorage.getItem('idSell'));
   
     useEffect(() => {
       const info = storeList.find((store) => store.id === idsell);
       setStoreInfo(info);
     }, [idsell]);
     useEffect(()=>{
    if(storeInfo && storeInfo.avatar){
    setAvatarPreview(storeInfo.avatar)

    }
  },[storeInfo])
     // Nếu chưa có dữ liệu thì không render gì
     if (!storeInfo) {
       return <div className={cx('container')}>Đang tải...</div>;
     }
    return (
    <div className={cx("container")}>

         <div>
            <div className={cx('inputedit')}>
            <div className={cx("userName")}>
            <p className={cx("editinfo")}>Tên Cửa Hàng: </p>
            <input
              type="text"
              className={cx("Edit")}
              name="Tên cửa hàng"
              defaultValue={storeInfo.name}
            />
            
          </div>
             <div className={cx("userName")}>
            <p className={cx("editinfo")}>Địa Chỉ: </p>
            <input
              type="text"
              className={cx("Edit")}
              name="phone"
              defaultValue={storeInfo.address}
            />
          </div>
            </div>
                      <div className={cx('inputedit')}>
            <div className={cx("userName")}>
            <p className={cx("editinfo")}>Email: </p>
            <input
              type="text"
              className={cx("Edit")}
              name="Tên cửa hàng"
              defaultValue={storeInfo.email}
            />
            
          </div>
             <div className={cx("userName")}>
            <p className={cx("editinfo")}>Số Điện Thoại: </p>
            <input
              type="text"
              className={cx("Edit")}
              name="phone"
              defaultValue={storeInfo.phone}
            />
          </div>
            </div>
            <div className={cx('inputedit')}>
            <div className={cx("userName")}>
            <p className={cx("editinfo")}>Facebook: </p>
            <input
              type="text"
              className={cx("Edit")}
              name="Tên cửa hàng"
              defaultValue={storeInfo.fanpage}
            />
            
          </div>
             <div className={cx("userName")}>
            <p className={cx("editinfo")}>Website: </p>
            <input
              type="text"
              className={cx("Edit")}
              name="phone"
              defaultValue={storeInfo.website}
            />
          </div>
            </div>
           
            <div className={cx('inputedit')}>
              <div className={cx('inputeditanh')}>
                <div className={cx("userName")}>
            <p className={cx("editinfo")}>Giấy Chứng Nhận An Toàn Thực Phẩm: </p>
            <input
              type="file"
              className={cx("Edit")}
              name="Tên cửa hàng"
              
              
            />
            
            </div>
             <div className={cx("userName")}>
            <p className={cx("editinfo")}>Giấy Phép Kinh Doanh: </p>
            <div className={cx('kd')}>
              <input
              type="file"
              className={cx("Edit")}
              name="phone"
              
            />
            </div>
            
            </div>
              </div>
            
            </div>

            <div className={cx("userStore")}>
            <p className={cx("editinfo")}>Giới Thiệu Cửa Hàng: </p>
            <input
              type="text"
              className={cx("desEdit")}
              name="description"
              defaultValue={storeInfo.description}
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
                          // onChange: khi người dùng chọn ảnh → lấy file đầu tiên (e.target.files[0]).
                          // URL.createObjectURL(file): tạo một đường dẫn tạm (blob URL) để 
                          // hiển thị ngay ảnh mới mà không cần upload lên server.    sẽ ko xác định đc ảnh
                            const file = e.target.files[0];
                            if (file) {
                                const imageUrl = URL.createObjectURL(file);
                                setAvatarPreview(imageUrl);
                            }
                        }}
                    />
                    <label
                    // htmlFor="fileInput" liên kết với input có id="fileInput".
                        htmlFor="fileInput"
                        className={cx('custom-file-label')}
                    >
                        Chọn tệp
                    </label>
            </div>
              
          </div>
            <div className={cx('Submit')} >
                  <Button primary large style={{ width: '50%' }}>
                                Lưu
                </Button>
                <Link to="/StoreSell" style={{ textDecoration: 'none', width:'50%',display:'flex',justifyContent:'center'}}>
                <Button outline large style={{ width: '100%' }}>
                  Hủy
                </Button>
              </Link>
          </div>
            
          
         </div>   
    </div>
    );
}

export default StoreSellEdit;