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
// Mỗi lần người dùng chọn filter mới (Select), component reset về trang 1.
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.status]);
    // chon select
const handleFilterChange = (value) => {
    const newParams = new URLSearchParams(searchParams); 
    /**Đây là một class có sẵn trong JavaScript dùng để làm việc với query string trên URL (phần sau dấu ?).
Nó cho phép bạn đọc, thêm, sửa, xóa tham số trong URL dễ dàng */
/** Nghĩa là newParams ban đầu sẽ sao chép toàn bộ các query đang có. */
    if (!value || value === 'Tất Cả') {
        newParams.delete('status');
    } else {
        newParams.set('status', value);
    }
    setSearchParams(newParams); 
};

       // phân trang
        const totalPages = Math.ceil(filteredOrders.length / OrderPage); // tính tổng số trang  nhớ ví dụ là 10 và đứng ở trang số 5
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

        return range; // trả về 1 mảng danh sách số trang bao gồm 1(trang đầu)...2,3,4,5,....10(trang cuối)

        /**
         * Giả sử totalPages = 10, delta = 2:
                currentPage = 1
                left = max(2, -1) = 2, right = min(9, 3) = 3
                range: [1, 2, 3, '...', 10]

                currentPage = 5
                left = 3, right = 7
                range: [1, '...', 3, 4, 5, 6, 7, '...', 10]

                currentPage = 9
                left = 7, right = 10-1=9
                range: [1, '...', 7, 8, 9, 10] (không có "..." sau 9 vì 9 sát 10)
         */
    };

    const paginationRange = getPaginationRange(currentPage, totalPages);

    const currentorder = filteredOrders.slice( //slice(start, end) lấy từ vị trí start đến end - 1
        (currentPage - 1) * OrderPage,
        currentPage * OrderPage,
        /**
         * Giả sử OrderPage = 4 (mỗi trang 4 đơn):
            currentPage = 1 → slice(0, 4) → lấy item 0,1,2,3
            currentPage = 2 → slice(4, 8) → lấy item 4,5,6,7
            currentPage = 3 → slice(8, 12) → lấy item 8,9,10,11
         */
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
            // 2 cái dưới thừa vì trong select nó đã đẩy lên URL rồi nền ko cần phải set lại 
            value={filters.status || 'Tất Cả'} // cái 1 tm thì k chọn cái 2
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
                                    <p>{item.product.price.toLocaleString('vi-VN')}đ</p>
                                </div>
                                <div className={cx('sumPrice')}>
                                    <p>Giảm Giá</p>
                                    <p>{item.discount.toLocaleString('vi-VN')}đ</p>
                                </div>
                                <div className={cx('sumPrice')}>
                                    <p>Phí Vận Chuyển</p>
                                    <p>{item.shippingFee.toLocaleString('vi-VN')}đ</p>
                                </div>
                                <div className={cx('sumPrice', 'total')}>
                                    <b>Tổng Tiền</b>
                                   <b>{TongTien(item).toLocaleString('vi-VN')} đ</b>
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
                                        // Nếu page === '...' thì disabled.
                                        // Nếu page === currentPage thì thêm class active.
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