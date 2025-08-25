import styles from "./StatisAdmin.module.scss";
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { listSelect,datachart,listUser,storeList } from '~/constant/mock-data';
import Select from '~/components/Select/Select';
import { useSearchParams } from 'react-router-dom';
import BarChartCustom from '~/components/Chart/Chart';
import PieChartCustom from '~/components/Chart/PieChar';

import { useCalendarData } from '~/constant/Time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShopLock,
  faStore,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function StatisticSell() {

 const [Year, setYear] = useState('');
 const [Month, setMonth] = useState('');
 const [Week, setWeek] = useState('');
 const [searchParams, setSearchParams] = useSearchParams();
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

const soluongUser=listUser.length;
const aprrovedStore=storeList.filter(item=> item.status==='approved').length;
const cancelledStore=storeList.filter(item=> item.status==='cancelled').length;
  return (
    <div className={cx('container')}>
     <div className={cx('contentHeader')}>

      <h4>Tổng Quan Báo Cáo</h4>
      <div className={cx('selectTime')}>
      <Select
       data={listSelect[3]}
       value={Year}
       onChange={(value) => handleFilterChange(value, Month, Week)}
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
                   <div className={cx("itemSta")}>
                  <div className={cx("item")}>
                    <div className={cx('headeritem')}>
                      <FontAwesomeIcon icon={faUserGroup} className={cx("icon")} />
                      <p>Khách Hàng</p>
                    </div>
                    <p>{soluongUser}</p>
                  </div>
                  <div className={cx("item")}>
                    <div className={cx('headeritem')}>
                      <FontAwesomeIcon icon={faShopLock} className={cx("icon")} />
                      <p>Cửa Hàng Chưa Duyệt</p>
                    </div>
                    <p>{cancelledStore}</p>
                  </div>
                  <div className={cx("item")}>
                    <div className={cx('headeritem')}>
                      <FontAwesomeIcon icon={faStore} className={cx("icon")} />
                      <p>Cửa Hàng</p>
                    </div>
                    <p>{aprrovedStore}</p>
                  </div>

            </div>
      <div className={cx('chart')}>
         <h4>Biểu Đồ Thể Hiện Thống Người Sử Dụng Website</h4>
        <PieChartCustom data={datachart} />
        <h4>Biểu Đồ  Thể Hiện Tổng Đơn Hàng Giao Dịch</h4>
        <BarChartCustom data={chartData} />
        
      </div>
     
      <div className={cx('detailBottom')}>
     
     
      </div>
       
     </div>
    </div>
  );
}
export default StatisticSell;