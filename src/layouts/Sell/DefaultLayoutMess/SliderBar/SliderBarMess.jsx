import classNames from 'classnames/bind';
import styles from './SliderBarMess.module.scss';

import ItemChat from '~/components/ItemChat/ItemChat';
import { chatMessages,listUser } from '~/constant/mock-data';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SliderBarMess({ className }) {
    const userId = parseInt(localStorage.getItem('idSell'));
    const userChats = chatMessages.filter(
        (msg) => msg.idSend === userId || msg.idReceive === userId,
    );

    const groupedByShop = {};

    userChats.forEach((msg) => {
        const shopId = msg.idSend === userId ? msg.idReceive : msg.idSend;

        if (!groupedByShop[shopId]) {
            groupedByShop[shopId] = [];
        }

        groupedByShop[shopId].push(msg);
    });

    const shopChatList = Object.entries(groupedByShop).map(([shopId, msgs]) => {
        const sorted = msgs.sort((a, b) => new Date(b.time) - new Date(a.time));
        const lastMsg = sorted[0];
        const shopInfo = listUser.find((shop) => shop.id === parseInt(shopId));

        return {
            id: shopInfo?.id,
            name: shopInfo?.name,
            avatar: shopInfo?.avatar,
            lastMessage: lastMsg.content,
            time: lastMsg.time,
        };
    });

    shopChatList.sort((a, b) => new Date(b.time) - new Date(a.time));

    return (
        <div className={cx('messlist', className)}>
            <h4 className={cx('title')}>Tin nhắn</h4>
            <div className={cx('wrapper')}>
                {shopChatList.length === 0 ? (
                    <div className={cx('no-message')}>
                        Bạn chưa có tin nhắn nào
                    </div>
                ) : (
                    shopChatList.map((shop) => (
                        <Link
                            to={`/MessageSell/${shop.id}`}
                            key={shop.id}
                            className={cx('chat-link')}
                        >
                            <ItemChat
                                name={shop.name}
                                avatar={shop.avatar}
                                lastMessage={shop.lastMessage}
                                time={shop.time}
                            />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default SliderBarMess;
