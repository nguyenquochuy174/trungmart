import styles from "./WalletSellEdit.module.scss"
import classNames from 'classnames/bind';
import { useState,useEffect } from 'react';
import { listinforWalletSell, ListBank } from '~/constant/mock-data';
import Select from "react-select";
import Button from '~/components/Button/Button';
import { Link } from "react-router-dom";


const cx = classNames.bind(styles);

function WalletSellEdit() {
  const [bank, setBank] = useState('Tất Cả');

  // đổi ngân hàng
  const handleBankChange = (value) => {
    // value là ngân hàng user chọn
    setBank(value || 'Tất Cả');
  };
const options = ListBank.map(item => ({
  value: item.value,
  label: (
    <div  className={cx('selectBank')}>
      <img src={item.img}  alt="" />
      <span>{item.label}</span>
    </div>
  )
}));
 const [info, setInfo] = useState([]);
    const idsell = parseInt(localStorage.getItem('idSell'))
    useEffect(() => {
  const filteredInfo = listinforWalletSell.filter(
    (msg) => parseInt(msg.idUser) === idsell
  );
  setInfo(filteredInfo);
}, [idsell]);
  return (
    <div className={cx("container")}>
      {info.map(info => (
        <div key={info.id}>
          <div className={cx('contentHeader')}>
            <h3>Chỉnh sửa ví điện tử</h3>
          </div>
          <div className={cx('contentBottom')}>
            <div className={cx('inputedit')}>
              <div className={cx("walletName")}>
                <p className={cx("editinfo")}>Tên Cửa Hàng: </p>
                <input
                  type="text"
                  className={cx("Edit")}
                  defaultValue={info.Name}
                />
              </div>

              <div className={cx("walletName")}>
                <p className={cx("editinfo")}>Ngân Hàng: </p>
                            <Select
                options={options}
                value={options.find(op => op.value === bank)}
                onChange={(op) => setBank(op.value)}
                />
              </div>
            </div>
            <div className={cx("imgQR")}>
            <p className={cx("editinfo")}>Mã QR(nếu có) </p>
            <input
              type="file"
              className={cx("Edit")}
              name="phone"
              
            />
            </div>
            <div className={cx("walletNumber")}>
                <p className={cx("editinfo")}>Số Tài Khoản: </p>
                <input
                  type="text"
                  className={cx("Edit")}
                  defaultValue={info.Name}
                />
              </div>
              <div className={cx('Submit')} >
                  <Button primary large >
                                Lưu
                </Button>
                 <Link to="/WalletSell" style={{ textDecoration: 'none', width:'40%',display:'flex',justifyContent:'center'}}>
                <Button outline large style={{ width: '50%' }}>
                  Hủy
                </Button>
              </Link>
          </div>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default WalletSellEdit;
