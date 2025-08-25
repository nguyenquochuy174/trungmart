import styles from "./ProfileSellEdit.module.scss";
import classNames from "classnames/bind";
import { listinfoSell } from "~/constant/mock-data";
import Button from '~/components/Button/Button';
import { useState,useEffect} from 'react';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function ProfileSellEdit() {
  const [info, setInfo] = useState([]);
      const idsell = parseInt(localStorage.getItem('idSell'))
       useEffect(() => {
  const filteredInfo = listinfoSell.find(
    (msg) => parseInt(msg.id) === idsell
  );
  setInfo(filteredInfo);
}, [idsell]);

 const [avatarPreview, setAvatarPreview] = useState(null);
   useEffect(()=>{
    if(info){
    setAvatarPreview(info.Avatar)
    }
  },[info])
  return (
    <div className={cx("content")}>
      {info && (
        <div key={info.id}>
          <div className={cx("userName")}>
            <p className={cx("editinfo")}>Tên đăng nhập: </p>
            <p>{info.Name}</p>
          </div>
          <div className={cx("userName")}>
            <p className={cx("editinfo")}>Họ tên: </p>
            <input
              type="text"
              className={cx("inputEdit")}
              name="name"
              defaultValue={info.Name}
            />
            
          </div>
          <div className={cx("userName")}>
            <p className={cx("editinfo")}>Email: </p>
            <input
              type="text"
              className={cx("inputEdit")}
              name="email"
              defaultValue={info.Email}
            />
            
          </div>
             <div className={cx("userName")}>
            <p className={cx("editinfo")}>Số điện thoại: </p>
            <input
              type="text"
              className={cx("inputEdit")}
              name="phone"
              defaultValue={info.Phone}
            />
            
          </div>
        <div className={cx("userName")}>
            <p className={cx("editinfo")}>Địa chỉ: </p>
            <input
              type="text"
              className={cx("inputEdit")}
              name="address"
              defaultValue={info.Address}
            />
            
          </div>
          <div className={cx("userName")}>
            <p className={cx("editinfo")}>Giới tính: </p>
            <div className={cx('radio')}>
                <label>
            <input type="radio" name="gender" value="male" /> Nam
            </label>
            <label>
            <input type="radio" name="gender" value="female" /> Nữ
            </label>
            <label>
            <input type="radio" name="gender" value="other" /> Khác
            </label>
            </div>
            
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
          <div className={cx('Submit')} >
                 <Button primary large style={{ width: '50%' }}>
                                Lưu
                </Button>
               <Link to="/ProfileSell" style={{ textDecoration: 'none', width:'100%',display:'flex',justifyContent:'center'}}>
                <Button outline large style={{ width: '50%' }}>
                  Hủy
                </Button>
              </Link>

          </div>
        
        </div>
      )}
    </div>
  );
}

export default ProfileSellEdit;
