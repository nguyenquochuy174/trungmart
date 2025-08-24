import classNames from 'classnames/bind';
import styles from './ProfileOrder.module.scss';
import OrderItem from '~/components/OrderItem/Order';
import { listOrders, listSelect } from '~/constant/mock-data';
import Select from '~/components/Select/Select';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

const cx = classNames.bind(styles);

function ProfileOrder() {
    const userId = Number(localStorage.getItem('userId'));
    let listOrderUser = listOrders.filter((item) => item.userId === userId);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyStatus = searchParams.get('status');
    listOrderUser = useMemo(() => {
        return listOrders.filter((order) => {
            const matchUser = order.userId === userId;
            const matchStatus = keyStatus ? order.status === keyStatus : true;
            return matchUser && matchStatus;
        });
    }, [keyStatus, userId]);
    const handleFilterChange = (newFilter) => {
        Object.entries(newFilter).forEach(([key, value]) => {
            if (
                value === null ||
                value === 'Tất cả' ||
                (Array.isArray(value) && value.length === 0)
            ) {
                searchParams.delete(key);
            } else {
                searchParams.set(
                    key,
                    Array.isArray(value) ? value.join(',') : value,
                );
            }
        });
        setSearchParams(searchParams);
    };
    return (
        <div className={cx('container')}>
            <div className={cx('fillter')}>
                <h3>Tổng quan đơn hàng</h3>
                <Select
                    data={listSelect[2]}
                    value={keyStatus}
                    onChange={(value) =>
                        handleFilterChange({
                            status: value || null,
                        })
                    }
                />
            </div>
            {listOrderUser.map((item) => (
                <OrderItem key={item.id} data={item} />
            ))}
        </div>
    );
}

export default ProfileOrder;
