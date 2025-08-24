import classNames from 'classnames/bind';
import styles from './ProfileAddress.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import { listAddress } from '~/constant/mock-data';
import Evaluate from '~/components/Evaluate/Evaluate';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ProfileAddress() {
    const userId = Number(localStorage.getItem('userId'));
    const [showEvaluateForm, setShowEvaluateForm] = useState(false);
    const listAddressUser = listAddress.filter(
        (item) => item.userId === userId,
    );

    return (
        <div className={cx('container')}>
            <div className={cx('headerAddress')}>
                <p>
                    <FontAwesomeIcon icon={faLocationDot} /> Địa chỉ của tôi
                </p>
                <Button primary small onClick={() => setShowEvaluateForm(true)}>
                    <FontAwesomeIcon icon={faAdd} /> Thêm địa chỉ
                </Button>
            </div>
            <div className={cx('listAddress')}>
                {listAddressUser.map((item) => (
                    <div className={cx('itemAddress')} key={item.id}>
                        <div className={cx('info')}>
                            <h3>{item.name}</h3>
                            <p>{item.phone}</p>
                            <p>{item.address}</p>
                        </div>
                        <Button text>Xóa</Button>
                    </div>
                ))}
            </div>
            {showEvaluateForm && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalContent')}>
                        <Evaluate setShowEvaluateForm={setShowEvaluateForm} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileAddress;
