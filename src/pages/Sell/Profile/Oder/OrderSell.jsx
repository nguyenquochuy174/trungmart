import styles from "./OrderSell.module.scss"
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { listOrder, listSelect, reportForm } from '~/constant/mock-data';
import Select from '~/components/Select/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import Button from '~/components/Button/Button';
import FormApprove from "~/components/FormApprove/FormApprove";


const cx = classNames.bind(styles);
function OrderSell() {
    const [currentPage, setCurrentPage] = useState(1);
    const OrderPage = 4;
    const [searchParams, setSearchParams] = useSearchParams();
    const [order,setOrder]= useState(false)
    // filters lọc
    
    const filters = useMemo(() => {
     return {
        status: searchParams.get('status')|| 'Tất Cả',
     };
    },[searchParams]);

    // listorder
const idsell = parseInt(localStorage.getItem('idSell'));

// Lọc đơn hàng vừa theo idSell vừa theo status
const filteredOrders = useMemo(() => {
    return listOrder.filter(order => {
        const matchSeller = parseInt(order.idUser) === idsell;
        const matchStatus = !filters.status || filters.status === 'Tất Cả' 
            ? true 
            : order.status === filters.status;
        return matchSeller && matchStatus;
    });
}, [idsell, filters]);
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.status]);
    // chon select
const handleFilterChange = (value) => {
    const newParams = new URLSearchParams(searchParams); 
    if (!value || value === 'Tất Cả') {
        newParams.delete('status');
    } else {
        newParams.set('status', value);
    }
    setSearchParams(newParams); 
};

       // phân trang
        const totalPages = Math.ceil(filteredOrders.length / OrderPage);
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
        (currentPage - 1) * OrderPage,
        currentPage * OrderPage,
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
                <>
                 <div className={cx('statusOrder')}>
                    <p>Đang chờ duyệt</p>
                    <div className={cx('accept')}>
                <Button primary small >
                                Duyệt
                </Button>
                <Button outline small 
                onClick={()=>{
                    setOrder(true)
                }}>
                                Hủy
                </Button>
                    </div>
                
                </div>
                 {order &&(
                     <div className={cx('modalOverlay')}>
            <div className={cx('modalContent')}>
              <FormApprove
                data={reportForm[1]}
                onClose={() => setOrder(false)}
                form
              />
            </div>
          </div>

                )
                    
                }
                </>
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
            value={filters.status || 'Tất Cả'}
            onChange={(value) => {
                handleFilterChange(value || 'Tất Cả')
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
               
                <div className={cx('pagination')}>
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                
                                {paginationRange.map((page, index) => (
                                    <button
                                        key={index}
                                        className={cx({ active: currentPage === page })}
                                        onClick={() => handlePageChange(page)}
                                        disabled={page === '...'}
                                    >
                                        {page}
                                    </button>
                                ))}
                
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>
        </div>
    </div>
    );
}
export default OrderSell;