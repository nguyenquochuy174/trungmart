import styles from './AddProductSell.module.scss';
import classNames from 'classnames/bind';
import { listMenuUser, storeList } from '~/constant/mock-data';
import Button from '~/components/Button/Button';
import { useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import {} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function AddProductSell() {
    const [bank, setBank] = useState('');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const idsell = parseInt(localStorage.getItem('idSell'));

    const info = storeList.find((store) => store.id === idsell);
    const [avatarPreview, setAvatarPreview] = useState(info.avatar);

    const options = listMenuUser[1].children.map((item) => ({
        value: item.name,
        label: ( //JSX để hiển thị trong dropdown.
            <div className={cx('selectBank')}>
                <span>{item.name}</span>
            </div>
        ),
        queryKey: item.queryKey,
    }));

    const handleSave = () => {
        // Kiểm tra tất cả các trường đã điền chưa
        if (!productName || !quantity || !price || !bank || !description) {
            alert('Vui lòng điền đầy đủ thông tin trước khi lưu!');
            return;
        }
        // Nếu đầy đủ, thực hiện lưu
        console.log({ productName, quantity, price, bank, description });
        alert('Lưu thành công!');
    };

    if (!info) {
        return <div className={cx('container')}>Đang tải...</div>;
    }

    return (
        <div className={cx('container')}>
            <div className={cx('contentedit')}>
                <h3>Thêm Sản Phẩm</h3>
            </div>
            <div className={cx('content')}>
                <div className={cx('inputedit')}>
                    <div className={cx('userName')}>
                        <p className={cx('editinfo')}>Tên Sản Phẩm: </p>
                        <input
                            type="text"
                            className={cx('Edit')}
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className={cx('userName')}>
                        <p className={cx('editinfo')}>Số Lượng: </p>
                        <input
                            type="text"
                            className={cx('Edit')}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('inputedit')}>
                    <div className={cx('userName')}>
                        <p className={cx('editinfo')}>Giá: </p>
                        <input
                            type="text"
                            className={cx('Edit')}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className={cx('userName')}>
                        <p className={cx('editinfo')}>Danh Mục: </p>
                        <Select
                        // react-select yêu cầu value phải là nguyên object option,
                            options={options}
                            value={options.find((op) => op.value === bank)}
                            onChange={(op) => setBank(op.value)}
                            // nhận về object option, nhưng bạn chỉ lưu value (string) vào state.
                        />
                    </div>
                </div>
                <div className={cx('userStore')}>
                    <p className={cx('editinfo')}>Giới Thiệu Sản Phẩm: </p>
                    <input
                        type="text"
                        className={cx('desEdit')}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={cx('userAnh')}>
                    <p className={cx('editinfo')}>Ảnh đại diện: </p>
                    <div className={cx('imgAvatar')}>
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
                <div className={cx('Submit')}>
                    <Button
                        primary
                        large
                        
                        onClick={handleSave}
                    >
                        Lưu
                    </Button>
                    <Link to="/ProductSell" >
                        <Button outline large >
                            Hủy
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AddProductSell;
