import classNames from 'classnames/bind';
import styles from './ProfileInfo.module.scss';
import { listUser } from '~/constant/mock-data';
import Button from '~/components/Button/Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ProfileInfo() {
    const userId = Number(localStorage.getItem('userId'));
    const user = listUser.find((item) => item.id === userId);
    const [avatarPreview, setAvatarPreview] = useState(user.avatar);

    return (
        <div className={cx('container')}>
            <div className={cx('form')}>
                <label htmlFor="">Tên đăng nhâp: </label>
                <p>{user.id}</p>
            </div>
            <div className={cx('form')}>
                <label htmlFor="name">Họ tên: </label>
                <input id="name" type="text" placeholder={user.name} />
            </div>
            <div className={cx('form')}>
                <label htmlFor="email">Email: </label>
                <input id="email" type="text" placeholder={user.email} />
            </div>
            <div className={cx('form')}>
                <label htmlFor="phone">Số điện thoại: </label>
                <input id="phone" type="text" placeholder={user.phone} />
            </div>
            <div className={cx('form')}>
                <label htmlFor="address">Địa chỉ: </label>
                <input id="address" type="text" placeholder={user.address} />
            </div>
            <div className={cx('formSex')}>
                <legend>Giới tính:</legend>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="0"
                        defaultChecked={user.sex === 0}
                    />
                    Nam
                </label>

                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="1"
                        defaultChecked={user.sex === 1}
                    />
                    Nữ
                </label>

                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="2"
                        defaultChecked={user.sex === 2}
                    />
                    Khác
                </label>
            </div>

            <div className={cx('formImg')}>
                <label htmlFor="fileInput">Ảnh đại diện:</label>
                <div className={cx('currentImg')}>
                    <img src={avatarPreview} alt="Ảnh đại diện" />
                    <input
                        type="file"
                        id="fileInput"
                        className={cx('file-input')}
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const imageUrl = URL.createObjectURL(file);
                                setAvatarPreview(imageUrl);
                            }
                        }}
                    />
                    <label
                        htmlFor="fileInput"
                        className={cx('custom-file-label')}
                    >
                        Chọn tệp
                    </label>
                </div>
            </div>

            <Button primary>Lưu</Button>
        </div>
    );
}

export default ProfileInfo;
