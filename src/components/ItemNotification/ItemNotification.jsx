import classNames from 'classnames/bind';
import styles from './ItemNotification.module.scss';
import Button from '../Button/Button';
import { storeList } from '~/constant/mock-data';

const cx = classNames.bind(styles);

function ItemNotification({ notifications, setNotifications }) {
    const handleMarkAsRead = (index) => {
        const updated = [...notifications];
        if (!updated[index].isRead) {
            updated[index].isRead = true;
            setNotifications(updated);
        }
    };

    const handleDelete = (index) => {
        const updated = [...notifications];
        updated.splice(index, 1);
        setNotifications(updated);
    };

    return (
        <>
            {notifications.map((item, index) => {
                const storeName =
                    storeList.find(
                        (itemStore) => itemStore.id === item.senderId,
                    )?.name || 'Cửa hàng không xác định';

                return (
                    <div
                        key={index}
                        className={cx('NotificationContainer', {
                            unread: !item.isRead,
                        })}
                        onClick={() => handleMarkAsRead(index)}
                    >
                        <div className={cx('NotificationContent')}>
                            <h3>{storeName}</h3>
                            <p>{item.content}</p>
                            <div className={cx('time')}>
                                <p>
                                    {new Date(
                                        item.timestamp,
                                    ).toLocaleTimeString('vi-VN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
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
                                // tránh click lan đến div ngoài
                                e.stopPropagation();
                                handleDelete(index);
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
