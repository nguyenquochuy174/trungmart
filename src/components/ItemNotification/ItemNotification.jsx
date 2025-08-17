import classNames from 'classnames/bind';
import styles from './ItemNotification.module.scss';
import Button from '../Button/Button';
import { storeList } from '~/constant/mock-data';

const cx = classNames.bind(styles);

function ItemNotification({ notifications, onDelete, onIsRead }) {
    return (
        <>
            {notifications.map((item) => {
                const storeName =
                    storeList.find((store) => store.id === item.senderId)
                        ?.name || 'Cửa hàng không xác định';

                return (
                    <div
                        key={item.id}
                        className={cx('NotificationContainer', {
                            unread: !item.isRead,
                        })}
                        onClick={() => {
                            if (!item.isRead) onIsRead(item.id);
                        }}
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
                                e.stopPropagation();
                                onDelete(item.id);
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
