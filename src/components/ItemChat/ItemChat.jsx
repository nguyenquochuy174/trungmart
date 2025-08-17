import classNames from 'classnames/bind';
import styles from './ItemChat.module.scss';

const cx = classNames.bind(styles);

function ItemChat({ name, avatar, lastMessage, time }) {
    const formattedTime = new Date(time).toLocaleDateString('vi-VN');

    return (
        <div className={cx('chat-item')}>
            <div className={cx('avatar')}>
                <img src={avatar} alt={name} />
            </div>
            <div className={cx('content')}>
                <div className={cx('top')}>
                    <h4 className={cx('name')}>{name}</h4>
                    <span className={cx('time')}>{formattedTime}</span>
                </div>
                <p className={cx('last-message')}>{lastMessage}</p>
            </div>
        </div>
    );
}

export default ItemChat;
