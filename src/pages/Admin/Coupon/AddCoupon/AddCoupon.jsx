import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AddCoupon.module.scss';
import Button from '~/components/Button/Button';
import Select from '~/components/Select/Select';
import { listSelect } from '~/constant/mock-data';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function AddCoupon() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const type = searchParams.get('typeCoupon') || '';

    const [form, setForm] = useState({
        code: '',
        description: '',
        value: '',
        quantity: '',
        minOrderValue: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (!form.startDate) {
            const today = new Date().toISOString().split('T')[0];
            setForm((prev) => ({ ...prev, startDate: today }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {
            code,
            description,
            value,
            quantity,
            minOrderValue,
            startDate,
            endDate,
        } = form;

        const today = new Date().toISOString().split('T')[0];
        const actualStartDate = startDate || today;

        if (
            !code.trim() ||
            !description.trim() ||
            !type ||
            !value ||
            !quantity ||
            !minOrderValue ||
            !endDate
        ) {
            toast.error('Vui lòng nhập đầy đủ tất cả các trường!');
            return;
        }

        if (endDate < actualStartDate) {
            toast.error('Ngày kết thúc phải bắt dầu từ ngày bắt đầu trở đi!');
            return;
        }

        toast.success('Tạo mã thành công!');
        setTimeout(() => navigate('/CouponAdmin'), 1500);
    };

    return (
        <div className={cx('add-coupon')}>
            <h2>Thêm mã giảm giá</h2>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <label>
                    Mã:
                    <input
                        type="text"
                        name="code"
                        placeholder="Nhập mã phiếu giảm..."
                        value={form.code}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Mô tả:
                    <input
                        type="text"
                        name="description"
                        placeholder="Mô tả phiếu giảm ..."
                        value={form.description}
                        onChange={handleChange}
                    />
                </label>

                <div className={cx('formDate')}>
                    <label>
                        <p className={cx('select')}>Loại</p>
                        <Select
                            data={listSelect.find((item) => item.id === 12)}
                        />
                    </label>

                    <label>
                        Giá trị:
                        <input
                            type="number"
                            name="value"
                            placeholder="Giá trị phiếu giảm ..."
                            value={form.value}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Số lượng:
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Số lượng ..."
                            value={form.quantity}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Đơn tối thiểu:
                        <input
                            type="number"
                            name="minOrderValue"
                            placeholder="Đơn tối thiểu để áp dụng phiếu giảm..."
                            value={form.minOrderValue}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className={cx('formDate')}>
                    <label>
                        Ngày bắt đầu:
                        <input
                            type="date"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Ngày kết thúc:
                        <input
                            type="date"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                <div className={cx('btnAddVoucher')}>
                    <Button primary type="submit">
                        Tạo mã
                    </Button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={1500} />
        </div>
    );
}

export default AddCoupon;
