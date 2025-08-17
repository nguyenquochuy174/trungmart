import styles from "./OrderSell.module.scss"
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { listOrder, listSelect } from '~/constant/mock-data';
import Select from '~/components/Select/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import Button from '~/components/Button/Button';


const cx = classNames.bind(styles);
function OrderSell() {
    const [currentPage, setCurrentPage] = useState(1);
    const [orderPerPage, setOrderPerPage] = useState(16);
    const [searchParams, setSearchParams] = useSearchParams();

    // filters lọc
    
    const filters = useMemo(() => {
     return {
        status: searchParams.get('status')|| 'Tất Cả',
     };
    },[searchParams]);

    // listorder
    const filteredOrders = useMemo(()=>{
        if(!filters.status||filters.status==='Tất Cả'){
            return listOrder;
        }
        return listOrder.filter((order)=>( order.status === filters.status));
    },[filters])
    // chon select
    const handleFilterChange=(value)=>{
        if(!value || value==='Tất Cả'){
            searchParams.delete('status')
        }else{
            searchParams.set('status',value)
        }
        setSearchParams(searchParams);
        setCurrentPage(1);
    }
       // phân trang
        const totalPages = Math.ceil(filteredOrders.length / orderPerPage);
    const getPaginationRange = (currentPage, totalPages, delta = 2) => {
        const range = [];
        const left = Math.max(2, currentPage - delta);
        const right = Math.min(totalPages - 1, currentPage + delta);

        range.push(1);

        if (left > 2) {
            range.push('...');
        }

        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        if (right < totalPages - 1) {
            range.push('...');
        }

        if (totalPages > 1) {
            range.push(totalPages);
        }

        return range;
    };

    const paginationRange = getPaginationRange(currentPage, totalPages);

    const currentorder = filteredOrders.slice(
        (currentPage - 1) * orderPerPage,
        currentPage * orderPerPage,
    );

    const handlePageChange = (page) => {
        if (page === '...' || page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };
    const viewOrder = (item)=>{
        if( item.status === 'approved' ){
            return (
                <div className={cx('statusOrder')}>
                    <p>Đã Giao</p>
                </div>
            )
        }
        if( item.status === 'shipping'){
            return (
                 <div className={cx('statusOrder')}>
                    <p>Đang Giao</p>
                 <div className={cx('accept')}>
                         <Button outline small >
                               Giao Thành Công
                        </Button>
                 </div>
               
                
                        
                </div>
            )
        }
        if (item.status === 'cancelled'){
            return(
                 <div className={cx('statusOrder')}>
                    <p>Đã Hủy</p>
                    <p>Lý do: {item.reason}</p>
                </div>
            )
           
        }
           if (item.status === 'pending'){
            return (
                 <div className={cx('statusOrder')}>
                    <p>Đang chờ duyệt</p>
                    <div className={cx('accept')}>
                <Button primary small >
                                Duyệt
                </Button>
                <Button outline small >
                                Hủy
                </Button>
                    </div>
                
                </div>
            )
           
        }
        }
const TongTien = (item) => {
    return Number(item.product.price) + Number(item.shippingFee) - Number(item.discount);
}
    return (
    <div className={cx('container')}>
        <div className={cx('contentHeader')}>
            <h4>Tổng Quan Đơn Hàng</h4>
            <Select
                data={listSelect[2]}
                value={filters.status||'Tất Cả'}
                onChange={(value)=>{
                    handleFilterChange({
                        status: value||'Tất Cả',
                    })
                }}
            />
        </div>
        <div className={cx('contentBottom')}>
                {currentorder.map((item,index)=>(
                    <div key={item.id} className={cx('inforder')}>
                    <div className={cx('Ordercontent')}>
                        <div className={cx('Product')}>
                            <b>Sản Phẩm</b>
                            <div className={cx('reviewOrder')}>
                                <img src={item.img} alt="" className={cx('imgproduct')}/>
                                <div className={cx('infoProduct')}>
                                    <b>{item.product.name}</b>
                                    <p>Địa chỉ giao: {item.product.description}</p>
                                    <p>Tên người nhận: {item.product.receiverName}</p>
                                    <p>Số điện thoại: {item.product.phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('Number')}>
                            <b>Số Lượng</b>
                            <p>{item.product.quantity}</p>
                        </div>
                        <div className={cx('Sum')}>
                            <b>Thành Tiền</b>
                            <div className={cx('sumOrder')}>
                                
                                <div className={cx('sumPrice')}>
                                    <p>Tổng Tiền</p>
                                    <p>{item.product.price}đ</p>
                                </div>
                                <div className={cx('sumPrice')}>
                                    <p>Giảm Giá</p>
                                    <p>{item.discount}đ</p>
                                </div>
                                <div className={cx('sumPrice')}>
                                    <p>Phí Vận Chuyển</p>
                                    <p>{item.shippingFee}đ</p>
                                </div>
                                <div className={cx('sumPrice', 'total')}>
                                    <b>Tổng Tiền</b>
                                    <b>{TongTien(item)}đ</b>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                        <div className={cx('dateOrder')}>
                            <p>Mã Đơn Hàng: {item.code}</p>
                            <p>Thời Gian Đặt: {item.orderTime}</p>

                        </div>
                        {viewOrder(item)}
                    </div>
                ))}
        </div>
    </div>
    );
}
export default OrderSell;