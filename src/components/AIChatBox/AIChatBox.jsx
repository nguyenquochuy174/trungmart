import styles from './AIChatBox.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faComment } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AIChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = () => {
        if (message.trim() === '') return;
        setMessages([...messages, message]);
        setMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={cx('chat-container', { open: isOpen })}>
            {isOpen ? (
                <div className={cx('chat-box')}>
                    <div className={cx('chat-header')}>
                        <span>TrungMart AI</span>
                        <FontAwesomeIcon
                            icon={faClose}
                            onClick={() => setIsOpen(false)}
                            className={cx('iconClose')}
                        />
                    </div>
                    <div className={cx('chat-body')}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={cx('message-wrapper', 'user')}
                            >
                                <div className={cx('message')}>{msg}</div>
                            </div>
                        ))}
                    </div>
                    <div className={cx('chat-input')}>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Nhập tin nhắn..."
                            rows={1}
                        />
                        <button onClick={handleSend}>Gửi</button>
                    </div>
                </div>
            ) : (
                <button
                    className={cx('chat-toggle')}
                    onClick={() => setIsOpen(true)}
                >
                    <FontAwesomeIcon icon={faComment} />
                </button>
            )}
        </div>
    );
}

export default AIChatBox;
