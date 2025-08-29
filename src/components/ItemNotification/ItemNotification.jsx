import classNames from 'classnames/bind';
import styles from './ItemNotification.module.scss';
import Button from '../Button/Button';
import { storeList, listUser } from '~/constant/mock-data';

const cx = classNames.bind(styles);

function ItemNotification({ notifications, onDelete, onIsRead }) {
    return (
        <>
            {notifications.map((item) => {
                let Name = '';
                if (item.roll === 'user') {
                    Name =
                        listUser.find((user) => user.id === item.senderId)
                            ?.name || 'Người Ẩn Danh';
                } else {
                    Name =
                        storeList.find((store) => store.id === item.senderId)
                            ?.name || 'Cửa hàng không xác định';
                }
                return (
                    <div
                        key={item.id}
                        className={cx('NotificationContainer', {
                            unread: !item.isRead, // nếu thông bao chưa đc đọc thì thêm unread
                        })}
                        onClick={() => {
                            if (!item.isRead) onIsRead(item.id); // ở đây do bên notication truyền vào là handleIsRead => handleIsRead(item.id)
                        }}
                    >
                        <div className={cx('NotificationContent')}>
                            <h3>{Name}</h3>
                            <p>{item.content}</p>
                            <div className={cx('time')}>
                                <p>
                                    {new Date(
                                        item.timestamp, //time: hiển thị giờ (hh:mm) và ngày (theo chuẩn Việt Nam vi-VN).
                                    ).toLocaleTimeString('vi-VN', {
                                        hour: '2-digit', //giờ sẽ hiển thị 2 chữ số
                                        minute: '2-digit', //phút cũng hiển thị 2 chữ số
                                    })}

                                </p>
                                <p>
                                    {new Date(
                                        item.timestamp,
                                    ).toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                        </div>
                        <Button
                            text
                            small
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(item.id);// ở đây do bên notication truyền vào là handleDeleteNotification => handleDeleteNotification(item.id)
                            }}
                        >
                            Xóa
                        </Button>
                    </div>
                );
            })}
        </>
    );
}

export default ItemNotification;
