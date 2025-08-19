import styles from "./StatisticSell.module.scss";
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { listProduct, listSelect } from '~/constant/mock-data';
import Select from '~/components/Select/Select';
import { useSearchParams } from 'react-router-dom';
import BarChartCustom from '~/components/Chart/Chart';
import { useCalendarData } from '~/constant/Time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPen,
  faUserCheck,
  faStar,
  faBox
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function StatisticSell() {

 const [Year, setYear] = useState('');
 const [Month, setMonth] = useState('');
 const [Week, setWeek] = useState('');
 const [searchParams, setSearchParams] = useSearchParams();
 const [info, setInfo] = useState([]);
 const [Sum,SetSum]=useState(0);
 const idsell = parseInt(localStorage.getItem('idSell'));

 useEffect(() => {
 const filteredInfo = listProduct.filter(
  (msg) => parseInt(msg.idStore) === idsell
  );
 setInfo(filteredInfo);
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
    let doanhthu=0;
    // Luôn trả về một mảng rỗng nếu calendarData không hợp lệ
    if (!calendarData || typeof calendarData !== 'object') {
      SetSum(0);
        return [];
    }
    
    // Kiểm tra và trả về dữ liệu hợp lệ
    if (calendarData.days?.length > 0) {
        const result=calendarData.days.map((w) =>{
        doanhthu+=w.uv
        return  {
            name: w.name,
            uv: w.uv,
        };
      });
      SetSum(doanhthu)
      return result;
    }
    if (calendarData.weeks?.length > 0) {
      const result=calendarData.weeks.map((w) =>{
        doanhthu+=w.uv
        return  {
            name: w.name,
            uv: w.uv,
        };
      });
      SetSum(doanhthu)
      return result;
    }
    if (calendarData.values?.length > 0) {
        
        const result=calendarData.values.map((m) => {
          doanhthu+=m.uv
          return {
             name: m.name,
            uv: m.uv,
          };
           
        });
        SetSum(doanhthu)
        return result;
    }
    
    // Trường hợp không có dữ liệu nào khớp, trả về mảng rỗng
     SetSum(0)
    return [];
}, [calendarData]);

  return (
    <div className={cx('container')}>
     <div className={cx('contentHeader')}>
      <h4>Tổng Quan Báo Cáo</h4>
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
     <div className={cx('contentBottom')}>
     <BarChartCustom data={chartData} />
      <div className={cx('detailBottom')}>
      <h4>Kết Quả Kinh Doanh</h4>
        <div className={cx("itemSta")}>
                  <div className={cx("item")}>
                    <div className={cx('headeritem')}>
                      <FontAwesomeIcon icon={faBox} className={cx("icon")} />
                      <p>Sản Phẩm</p>
                    </div>
                    <p>100</p>
                  </div>
                  <div className={cx("item")}>
                    <div className={cx('headeritem')}>
                      <FontAwesomeIcon icon={faStar} className={cx("icon")} />
                      <p>Doanh Thu</p>
                    </div>
                    <p>{Sum}</p>
                  </div>
                  <div className={cx("item")}>
                    <div className={cx('headeritem')}>
                      <FontAwesomeIcon icon={faUserCheck} className={cx("icon")} />
                      <p>Tham Gia</p>
                    </div>
                    <p> năm</p>
                  </div>
                </div>
      </div>
       
     </div>
    </div>
  );
}
export default StatisticSell;