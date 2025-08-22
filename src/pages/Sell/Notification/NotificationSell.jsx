import { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './NotificationSell.module.scss';
import ItemNotification from '~/components/ItemNotification/ItemNotification';
import { listNotificationSell } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const notificationsPage = 10;

    const idSell = useMemo(() => parseInt(localStorage.getItem('idSell')), []);

    useEffect(() => {
        const userNotifications = listNotificationSell.filter(
            (item) => item.receiverId === idSell,
        );
        setNotifications(userNotifications);
    }, [idSell]);

    const latestNotifications = useMemo(() => {
        return [...notifications].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        );
    }, [notifications]);

    const totalPages = Math.ceil(
        latestNotifications.length / notificationsPage,
    );

    const getPaginationRange = (currentPage, totalPages, delta = 2) => {
        const range = [];
        const left = Math.max(2, currentPage - delta);
        const right = Math.min(totalPages - 1, currentPage + delta);

        range.push(1);
        if (left > 2) range.push('...');
        for (let i = left; i <= right; i++) range.push(i);
        if (right < totalPages - 1) range.push('...');
        if (totalPages > 1) range.push(totalPages);

        return range;
    };

    const paginationRange = getPaginationRange(currentPage, totalPages);

    const currentNotifications = latestNotifications.slice(
        (currentPage - 1) * notificationsPage,
        currentPage * notificationsPage,
    );

    const hasUnread = notifications.some((item) => !item.isRead);

    const allIsRead = () => {
        const updated = notifications.map((item) => ({
            ...item,
            isRead: true,
        }));
        setNotifications(updated);
    };

    const handleDeleteNotification = (notificationId) => {
        const updated = notifications.filter(
            (item) => item.id !== notificationId,
        );
        setNotifications(updated);

        const newTotalPages = Math.ceil(updated.length / notificationsPage);
        if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1);
        }
    };

    const handlePageChange = (page) => {
        if (page === '...' || page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };
    const handleIsRead = (notificationId) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === notificationId ? { ...item, isRead: true } : item,
            ),
        );
    };

    return (
        <>
            <div className={cx('head')}>
                <p>Thông báo</p>
                <p
                    className={cx('mark-all', { active: hasUnread })}
                    onClick={hasUnread ? allIsRead : undefined}
                >
                    Đánh dấu đã đọc tất cả
                </p>
            </div>

            <ItemNotification
                notifications={currentNotifications}
                onDelete={handleDeleteNotification}
                onIsRead={handleIsRead}
            />

            <div className={cx('pagination')}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                {paginationRange.map((page, index) => (
                    <button
                        key={index}
                        className={cx({ active: currentPage === page })}
                        onClick={() => handlePageChange(page)}
                        disabled={page === '...'}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </>
    );
}

export default Notification;
