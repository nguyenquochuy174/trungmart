import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { chatMessages, storeList } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClose,
    faPaperPlane,
    faUpload,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Message() {
    const userId = parseInt(localStorage.getItem('userId'));
    const { shopId } = useParams();
    const shop = storeList.find((s) => s.id === parseInt(shopId));
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    useEffect(() => {
        const newChatMessages = chatMessages
            .filter(
                (msg) =>
                    (msg.idSend === userId && msg.idReceive === shop?.id) ||
                    (msg.idReceive === userId && msg.idSend === shop?.id),
            )
            .sort((a, b) => new Date(a.time) - new Date(b.time));

        setMessages(newChatMessages);
       
    }, [chatMessages, shopId]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (!shop) return <div className={cx('no-chat')}>Không tìm thấy shop</div>;

    const getChatId = (messages) => {
        const maxId = messages.reduce((max, msg) => {
            const match = msg.idChat.match(/^msg(\d+)$/);
            if (match) {
                const num = parseInt(match[1], 10);
                return Math.max(max, num);
            }
            return max;
        }, 0);

        return `msg${maxId + 1}`;
    };

    const handleSend = () => {
        const trimmed = messageInput.trim();
        if (!trimmed && selectedFiles.length === 0) return;

        const newMessages = [];

        selectedFiles.forEach((file) => {
            const isImage = file.type.startsWith('image/');
            const fileUrl = URL.createObjectURL(file);

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

        setMessages((prev) => [...prev, ...newMessages]);
        setMessageInput('');
        setSelectedFiles([]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
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
            <div className={cx('preview-list')}>
                {selectedFiles.map((file, index) => {
                    const isImage = file.type.startsWith('image/');
                    const url = URL.createObjectURL(file);

                    return (
                        <div key={index} className={cx('preview-item')}>
                            {isImage ? (
                                <img
                                    src={url}
                                    alt={`preview-${index}`}
                                    className={cx('preview-image')}
                                />
                            ) : (
                                <div className={cx('file-preview')}>
                                    📎 {file.name}
                                </div>
                            )}
                            <button
                                onClick={() =>
                                    setSelectedFiles((prev) =>
                                        prev.filter((_, i) => i !== index),
                                    )
                                }
                                className={cx('remove-preview')}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                    );
                })}
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

export default Message;
