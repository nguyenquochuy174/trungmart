import styles from "./StatisticSell.module.scss";
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { listProduct, listSelect,listOrder } from '~/constant/mock-data';
import Select from '~/components/Select/Select';
import { useSearchParams } from 'react-router-dom';
import BarChartCustom from '~/components/Chart/Chart';
import { useCalendarData } from '~/constant/Time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowTrendUp,
  faComments,
  faSackDollar,
  faBox,
  faStar
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function StatisticSell() {

 const [Year, setYear] = useState('');
 const [Month, setMonth] = useState('');
 const [Week, setWeek] = useState('');
 const [searchParams, setSearchParams] = useSearchParams();
 const [info, setInfo] = useState([]);
 const [infoOrder, setInfoOrder] = useState([]);



 const idsell = parseInt(localStorage.getItem('idSell'));

 useEffect(() => {
 const filteredInfo = listProduct.filter(
  (msg) => parseInt(msg.idStore) === idsell
  );
 setInfo(filteredInfo);
 }, [idsell]);
  useEffect(() => {
 const filteredInfo = listOrder.filter(
  (msg) => parseInt(msg.idUser) === idsell
  );
 setInfoOrder(filteredInfo);
 }, [idsell]);
 // Cập nhật state từ URL khi load trang
 useEffect(() => {
 const yearParam = searchParams.get('Year');
 const monthParam = searchParams.get('Month');
 const weekParam = searchParams.get('Week');

 if (yearParam) setYear(yearParam);
 if (monthParam) setMonth(monthParam);
 if (weekParam) setWeek(weekParam);
 }, [searchParams]);

 const handleFilterChange = (valueYear, valueMonth, valueWeek) => {
  valueYear = valueYear?.trim();
  valueMonth = valueMonth?.trim();
  valueWeek = valueWeek?.trim();
    setYear(valueYear);
    setMonth(valueMonth);
    setWeek(valueWeek);

const newParams = new URLSearchParams();
  if (valueYear) {
    newParams.set("Year", valueYear);
  } else {
    newParams.delete("Year");
    
     newParams.delete("Month");
    newParams.delete("Week");
    
  }

  // Month
  if (valueMonth) {
    newParams.set("Month", valueMonth);
  } else {
    newParams.delete("Month");
    newParams.delete("Week");
  }

  // Week
  if (valueWeek) {
    newParams.set("Week", valueWeek);
  } else {
    newParams.delete("Week");
  }
setSearchParams(newParams);
 };

 // Lấy dữ liệu calendar dựa trên state
    const calendarData = useCalendarData(Year, Month, Week);

  const chartData = useMemo(() => {
    // Luôn trả về một mảng rỗng nếu calendarData không hợp lệ
    if (!calendarData || typeof calendarData !== 'object') {
   
        return [];
    }
    
    // Kiểm tra và trả về dữ liệu hợp lệ
    if (calendarData.days?.length > 0) {
        const result=calendarData.days.map((w) =>{
  
        return  {
            name: w.name,
            uv: w.uv,
        };
      });
   
      return result;
    }
    if (calendarData.weeks?.length > 0) {
      const result=calendarData.weeks.map((w) =>{

        return  {
            name: w.name,
            uv: w.uv,
        };
      });
    
      return result;
    }
    if (calendarData.values?.length > 0) {
        
        const result=calendarData.values.map((m) => {
      
          return {
             name: m.name,
            uv: m.uv,
          };
           
        });
    
        return result;
    }
    
    // Trường hợp không có dữ liệu nào khớp, trả về mảng rỗng
   
    return [];
}, [calendarData]);

const sumorder=infoOrder.reduce((acc,item)=>acc+(item.product.price-item.discount+item.shippingFee),0);

const order=infoOrder.reduce((acc,item)=>acc+item.idUser,0);
const comment = info.reduce((acc, item) => acc + item.reviews, 0);
const threshold = 25; 
const thresta = 110; 
const trendProducts = info.filter(item => item.totalStars > thresta);
const hotProducts = info.filter(item => item.reviews > threshold);
  return (
    <div className={cx('container')}>
     <div className={cx('contentHeader')}>
       
          <div className={cx('title')}>
      <h4>Tổng Quan Báo Cáo</h4>
      </div>
      <div className={cx('selectitem')}> 
      <Select
       data={listSelect[3]}
       value={Year}
       onChange={(value) => handleFilterChange(value, Month, Week)}
        className={cx('customSelect')}
      />
      <Select
       data={listSelect[4]}
       value={Month}
       onChange={(value) => handleFilterChange(Year, value, Week)}
      />
      <Select
       data={listSelect[5]}
       value={Week}
       onChange={(value) => handleFilterChange(Year, Month, value)}
      />
     </div>
     </div>
     <div className={cx('contentBottom')}>
      <div className={cx('chart')}>
        <BarChartCustom data={chartData} />
      </div>
     
      <div className={cx('detailBottom')}>
        <div className={cx('result')}>
             <h4>Kết Quả Kinh Doanh</h4>
        </div>
     
        <div className={cx("itemSta")}>
                  <div className={cx("item")}>
                    <div className={cx('headeritem')}>
                      <FontAwesomeIcon icon={faBox} className={cx("icon")} />
                      <p>Đơn Hàng</p>
                    </div>
                    <p>{order}</p>
                  </div>
                  <div className={cx("item")}>
                    <div className={cx('headeritem')}>
                      <FontAwesomeIcon icon={faSackDollar} className={cx("icon")} />
                      <p>Doanh Thu</p>
                    </div>
                    <p>{sumorder.toLocaleString('vi-VN')}VNĐ</p>
                  </div>
                  <div className={cx("item")}>
                    <div className={cx('headeritem')}>
                      <FontAwesomeIcon icon={faComments} className={cx("icon")} />
                      <p>Đánh Giá</p>
                    </div>
                    <p>{comment}</p>
                  </div>

        </div>
        
           
              <div className={cx('SanPham')}>
              <div className={cx('hot')}>
                <div className={cx('bottomitem')}>
                  <FontAwesomeIcon icon={faBox} className={cx("icon")} />
                  <p>Sản Phẩm Nổi Bật</p>
                </div>

                <div className={cx('listproduct')}>
                 
                  {trendProducts.map((item) => (
                    <div key={item.id} className={cx('productHot')}>
                      <img src={item.image[0].url} alt="" />
                      <div className={cx('contentHot')}>
                        <b>{item.name}</b>
                        <p>{item.totalStars} <FontAwesomeIcon icon={faStar} className={cx("icon")} /></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cx('hot')}>
                <div className={cx('bottomitem')}>
                  <FontAwesomeIcon icon={faArrowTrendUp} className={cx("icon")} />
                  <p>Xu Hướng</p>
                </div>

                <div className={cx('listproduct')}>
                   {hotProducts.map((item) => (
                    <div key={item.id} className={cx('productHot')}>
                      <img src={item.image[0].url} alt="" />
                      <div className={cx('contentHot')}>
                        <b>{item.name}</b>
                        <p>{item.reviews} Đánh Giá</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

      </div>
       
     </div>
    </div>
  );
}
export default StatisticSell;