import classNames from 'classnames/bind';
import styles from './MessageSell.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { chatMessages, listUser } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClose,
    faPaperPlane,
    faUpload,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MessageSell() {
    const userId = parseInt(localStorage.getItem('idSell'));
    const { idUser } = useParams();
    
    const shop = listUser.find((s) => s.id === parseInt(idUser));
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    useEffect(() => {
        const newChatMessages = chatMessages
            .filter(
                (msg) =>
                    (msg.idSend === userId && shop && msg.idReceive === shop.id) ||
                    (msg.idReceive === userId && shop && msg.idSend === shop.id),
            )
            .sort((a, b) => new Date(a.time) - new Date(b.time));

        setMessages(newChatMessages);
       
    }, [idUser,shop,userId]);
    /**
     * useEffect này chạy mỗi khi idUser, shop, userId thay đổi.
            Lọc ra tin nhắn giữa user hiện tại và shop.
            Sắp xếp theo thời gian tăng dần.
            Cập nhật state messages.
     */

    const messagesEndRef = useRef(null);
    /**useRef có thể lưu trữ bất cứ giá trị nào mà bạn không muốn đưa vào state. 
     * Khác với useState, thay đổi giá trị trong useRef không khiến component re-render. */

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]); // tự động cuốn xuống tin nhắn

    if (!shop) return <div className={cx('no-chat')}>Không tìm thấy shop</div>;

    const getChatId = (messages) => {
        const maxId = messages.reduce((max, msg) => {
            const match = msg.idChat.match(/^msg(\d+)$/);
            if (match) {
                const num = parseInt(match[1], 10); // chuyển chuỗi thành hệ số 10
                return Math.max(max, num); // cập nhật giá trị lớn nhất
            }
            return max;
        }, 0);

        return `msg${maxId + 1}`;//Tăng maxId lên 1 → đảm bảo id mới không trùng với id đã tồn tại.
        /**
         * useEffect này chạy mỗi khi idUser, shop, userId thay đổi.
                Lọc ra tin nhắn giữa user hiện tại và shop.
                Sắp xếp theo thời gian tăng dần.
                Cập nhật state messages.
         */
    };

    const handleSend = () => {
        const trimmed = messageInput.trim();
        if (!trimmed && selectedFiles.length === 0) return;

        const newMessages = [];

        selectedFiles.forEach((file) => {
            const isImage = file.type.startsWith('image/');
            const fileUrl = URL.createObjectURL(file);//tạo link tạm thời để preview hoặc download file

            newMessages.push({
                idChat: getChatId([...messages, ...newMessages]),
                idSend: userId,
                idReceive: shop.id,
                content: fileUrl,
                fileName: file.name,
                fileType: file.type,
                time: new Date().toISOString(),
                type: isImage ? 'image' : 'file',
            });
        });

        if (trimmed) {
            newMessages.push({
                idChat: getChatId([...messages, ...newMessages]),
                idSend: userId,
                idReceive: shop.id,
                content: trimmed,
                time: new Date().toISOString(),
                type: 'text',
            });
        }

        setMessages((prev) => [...prev, ...newMessages]);//Thêm newMessages vào cuối state messages
        setMessageInput('');
        setSelectedFiles([]);
        /**Reset input text và danh sách file đã chọn.
Nhờ React re-render → tin nhắn mới hiển thị ngay */
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend(); // gọi hàm để gửi tin nhắn 
        }
    };

    return (
        <div className={cx('message-detail')}>
            <div className={cx('header')}>
                <img
                    src={shop.avatar}
                    alt={shop.name}
                    className={cx('avatar')}
                />
                <h3 className={cx('shop-name')}>{shop.name}</h3>
            </div>

            <div className={cx('messages')}>
                {messages.map((msg) => (
                    <div
                        key={msg.idChat}
                        className={cx('message', {
                            'from-user': msg.idSend === userId,
                            'from-shop': msg.idSend !== userId,
                        })}
                    >
                        {msg.type === 'image' ? (
                            <img
                                src={msg.content}
                                alt="img"
                                className={cx('image-message')}
                            />
                        ) : msg.type === 'file' ? (
                            <a
                                href={msg.content}
                                download={msg.fileName}
                                className={cx('file-message')}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                📎 {msg.fileName}
                            </a>
                        ) : (
                            <p className={cx('content')}>{msg.content}</p>
                        )}
                        <span className={cx('time')}>
                            {new Date(msg.time).toLocaleTimeString('vi-VN')}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
           
            <div className={cx('input-box')}>
                <input
                    type="text"
                    placeholder="Nhập nội dung tin nhắn..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <label className={cx('icon')}>
                    <FontAwesomeIcon icon={faUpload} />
                    <input
                        type="file"
                        multiple
                        onChange={(e) =>
                            setSelectedFiles(Array.from(e.target.files))
                        }
                        hidden
                    />
                </label>
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={cx('icon')}
                    onClick={handleSend}
                />
            </div>
        </div>
    );
}

export default MessageSell;
