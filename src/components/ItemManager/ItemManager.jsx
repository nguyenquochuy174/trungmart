import classNames from 'classnames/bind';
import styles from './ItemManager.module.scss';
import FormApprove from '~/components/FormApprove/FormApprove';
import { storeList, listUser, reportForm,listinfoSell } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ItemManager({ data, area, status }) {
  const [hover, setHover] = useState(null);
  const [searchParams] = useSearchParams();
  const search = (searchParams.get("search") || "").toLowerCase();

  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showDeleteFormstore, setShowDeleteFormstore] = useState(false);
  const [showReportFormstore, setShowReportFormstore] = useState(false);
   const [showUnblockFormstore, setShowUnblockFormstore] = useState(false);
   const [showUnblockFormUser, setShowUnblockFormUser] = useState(false);


  const statusMapUser = {
    Sell: ['sell', 'Người Bán'],
    block: ['block', 'Khóa'],
    user: ['user', 'Khách Hàng']
  };

  const statusMapStore = {
    cancelled: ['sell', 'Chưa Duyệt'],
    block: ['block', 'Khóa'],
    approved: ['user', 'Hoạt Động']
  };

  const viewUser = (roll) => {
    const [cls, text] = statusMapUser[roll] || ['user', 'Khách Hàng'];
    return <div className={cx(cls)}>{text}</div>;
  };

  const viewStore = (store) => {
    const [cls, text] = statusMapStore[store.status] || ['user', 'Hoạt Động'];
    return <div className={cx(cls)}>{text}</div>;
  };

  const storeUser = (id) => {
    const store = listinfoSell.find((item) => item.idstore === id);
    return store ? (store.LastName+" "+store.Name) : '';
  };

  const filteredUsers = listUser.filter((item) => {
    if (item.roll?.toLowerCase() === 'admin') return false;
    const matchStatus =
      status === 'cancelled'
        ? item.roll?.toLowerCase() === 'sell'
        : status === 'block'
        ? item.roll === 'block'
        : true;
    const matchArea = !area || area === 'Tất Cả' || item.area === area;
    const matchSearch =
      [item.name, item.email].some((val) =>
        (val || '').toLowerCase().includes(search)
      );
    return matchStatus && matchArea && matchSearch;
  });

  const filteredStores = storeList.filter((item) => {
    const matchStatus =
      status === 'cancelled'
        ? item.status === 'cancelled'
        : status === 'block'
        ? item.status === 'block'
        : status === 'approved'
        ? item.status === 'approved'
        : true;
    const matchArea = !area || area === 'Tất Cả' || item.area === area;
    const matchSearch =
      [item.name, item.address, storeUser(item.id)].some((val) =>
        (val || '').toLowerCase().includes(search)
      );
    return matchStatus && matchArea && matchSearch;
  });

  return (
    <div>
      {data === 'user' ? (
        <>
          <div className={cx('title')}>
            <div className={cx('banner')}>
              <h3>Danh Sách Người Dùng</h3>
            </div>
            <div className={cx('menu')}>
              <div className={cx('infomenu')}>
                <p>Tên Người Dùng</p>
                <p>Email</p>
              </div>
              <div className={cx('infoendmenu')}>
                <p className={cx('address')}>Địa Chỉ</p>
                <p>Trạng Thái</p>
              </div>
            </div>
          </div>

          {filteredUsers.map((item, index) => (
            <div key={item.id} className={cx('itemManager')}>
              <div className={cx('imgAvatar')}>
                <img src={item.avatar} alt="" />
              </div>
              <div className={cx('info')}>
                <p>{item.name}</p>
                <p>{item.email}</p>
              </div>
              <div className={cx('infoend')}>
                <div className={cx('display')}>
                  <p>{item.address}</p>
                </div>
                <div className={cx('icon')}>
                  <div className={cx('status')}>{viewUser(item.roll)}</div>
                  <div className={cx('iconaction')}>
                    <FontAwesomeIcon
                      icon={hover === `user-${index}` ? faEyeSlash : faEye}
                      className={cx('iconEye')}
                      onMouseEnter={() => setHover(`user-${index}`)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() =>
                            item.roll === 'block'
                                ? setShowUnblockFormUser(true)
                                : setShowReportForm(true)
                        }
                     
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={cx('delete')}
                      
                      onClick={() => setShowDeleteForm(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className={cx('title')}>
            <div className={cx('banner')}>
              <h3>Danh Sách Cửa Hàng</h3>
            </div>
            <div className={cx('menu')}>
              <div className={cx('infomenu')}>
                <p>Tên Cửa Hàng</p>
                <p className={cx('address')}>Địa Chỉ</p>
              </div>
              <div className={cx('infoendmenu')}>
                <p>Tên Chủ Cửa hàng</p>
                <p>Trạng Thái</p>
              </div>
            </div>
          </div>

          {filteredStores.map((item, index) => (
            <Link to={`/StoreAdmin/${item.id}`} key={item.id}>
              <div className={cx('itemManager')}>
                <div className={cx('imgAvatar')}>
                  <img src={item.avatar} alt="" />
                </div>
                <div className={cx('info')}>
                  <p>{item.name}</p>
                  <p>{item.address}</p>
                </div>
                <div className={cx('infoend')}>
                  <div className={cx('display')}>
                    <p>{storeUser(item.id)}</p>
                  </div>
                  <div className={cx('icon')}>
                    <div className={cx('status')}>{viewStore(item)}</div>
                    <div className={cx('iconaction')}>
                      <FontAwesomeIcon
                        icon={hover === `store-${index}` ? faEyeSlash : faEye}
                        className={cx('iconEye')}
                        onMouseEnter={() => setHover(`store-${index}`)}
                        onMouseLeave={() => setHover(null)}
                         onClick={(e) =>{
                            e.preventDefault();
                            item.status === 'block'
                                ? setShowUnblockFormstore(true)
                                : setShowReportFormstore(true)
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={cx('delete')}
                        onClick={(e) => {
                          e.preventDefault();
                          setShowDeleteFormstore(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}

      {/* Modal cho user */}
      {showDeleteForm && (
        <div className={cx('modalOverlay')}>
          <div className={cx('modalContent')}>
            <FormApprove
              data={reportForm[4]}
              onClose={() => setShowDeleteForm(false)}
               form
            />
          </div>
        </div>
      )}
      {showReportForm && (
        <div className={cx('modalOverlay')}>
          <div className={cx('modalContent')}>
            <FormApprove
              data={reportForm[5]}
              onClose={() => setShowReportForm(false)}
               form
            />
          </div>
        </div>
      )}

      {/* Modal cho store */}
      {showDeleteFormstore && (
        <div className={cx('modalOverlay')}>
          <div className={cx('modalContent')}>
            <FormApprove
              data={reportForm[6]}
              onClose={() => setShowDeleteFormstore(false)}
               form
            />
          </div>
        </div>
      )}
      {showReportFormstore && (
        <div className={cx('modalOverlay')}>
          <div className={cx('modalContent')}>
            <FormApprove
              data={reportForm[7]}
              onClose={() => setShowReportFormstore(false)}
               form
            />
          </div>
        </div>
      )}
          {showUnblockFormstore && (
        <div className={cx('modalOverlay')}>
          <div className={cx('modalContent')}>
            <FormApprove
              data={reportForm[8]}
              onClose={() => setShowUnblockFormstore(false)}
            />
          </div>
        </div>
      )}
          {showUnblockFormUser && (
        <div className={cx('modalOverlay')}>
          <div className={cx('modalContent')}>
            <FormApprove
              data={reportForm[9]}
              onClose={() => setShowUnblockFormUser(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemManager;
