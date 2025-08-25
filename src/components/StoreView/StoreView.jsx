import classNames from 'classnames/bind';
import styles from './StoreView.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faFacebookMessenger,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {
    faCircleExclamation,
    faShop,
    faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import { faHeart, faStar } from '@fortawesome/free-regular-svg-icons';
import { listProduct } from '~/constant/mock-data';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function StoreView({ data, report, onReportClick,form=true,check=false }) {
    const navigate = useNavigate();
    const totalStoreProducts = listProduct.filter(
        (product) => Number(product.idStore) === data.id,
    ).length;

    const joinedYear = data?.joinedAt
        ? new Date(data.joinedAt).getFullYear()
        : null;

    const currentYear = new Date().getFullYear();

    const yearsActive =
        joinedYear !== null
            ? Math.max(0, currentYear - joinedYear)
            : 'Không rõ';

    const handleMessageClick = () => {
        navigate(`/UserMessage/${data.id}`);
    };

    return (
        <div className={cx('storeContainer')}>
            <div className={cx('storeTop')}>
                {form ?(
                     <Link
                    to={`/UserInfoShop/${data.id}`}
                    className={cx('menu-link')}
                >
                    <div className={cx('storeInfo')}>
                        <div className={cx('storeAvatar')}>
                            <img src={data.avatar} alt="Avatar" />
                        </div>
                        <div className={cx('storeDetails')}>
                            <p className={cx('storeName')}>{data.name}</p>
                            <p className={cx('storePhone')}>{data.phone}</p>
                            <p className={cx('storeAddress')}>{data.address}</p>
                        </div>
                    </div>
                </Link>
                ):(
                    <div className={cx('storeInfo')}>
                        <div className={cx('storeAvatar')}>
                            <img src={data.avatar} alt="Avatar" />
                        </div>
                        <div className={cx('storeDetails')}>
                            <p className={cx('storeName')}>{data.name}</p>
                            <p className={cx('storePhone')}>{data.phone}</p>
                            <p className={cx('storeAddress')}>{data.address}</p>
                        </div>
                    </div>
                )}
               

                <div className={cx('storeSocial')}>
                    <div className={cx('storeStats')}>
                        <p>
                            <FontAwesomeIcon icon={faShop} /> Sản Phẩm
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faStar} /> Đánh Giá
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faUserCheck} /> Tham Gia
                        </p>
                    </div>

                    <div className={cx('storeNumbers')}>
                        <p>{totalStoreProducts}</p>
                        <p>
                            {data.rating}{' '}
                            <span className={cx('ratingCount')}>
                                ({data.totalReviews} Đánh giá)
                            </span>
                        </p>
                        <p className={cx('storeJoined')}>
                            {typeof yearsActive === 'number'
                                ? `${yearsActive} năm trước`
                                : 'Không rõ thời gian tham gia'}
                        </p>
                    </div>
                </div>
            </div>
            {form ? (
                <div className={cx('storeActions')}>
                <div className={cx('storeSocial')}>
                    <div className={cx('storeShare')}>
                        <p>Chia sẻ:</p>
                        <div className={cx('socialIcons')}>
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className={cx('icon')}
                            />
                            <FontAwesomeIcon
                                icon={faFacebookMessenger}
                                className={cx('icon')}
                            />
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className={cx('icon')}
                            />
                        </div>
                    </div>
                    <div className={cx('storeFavorite')}>
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={cx('icon')}
                        />
                        <p>Yêu thích</p>
                    </div>
                </div>

                <div className={cx('storeContact')}>
                    {report && (
                        <div
                            className={cx('storeReport')}
                            onClick={onReportClick}
                        >
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                className={cx('icon')}
                            />
                            <p>Báo cáo</p>
                        </div>
                    )}

                    <Button outline small onClick={handleMessageClick}>
                        Nhắn tin
                    </Button>
                </div>
            </div>
            ):(
                check ?(
                     <div className={cx('btn')}>          
                        <Button primary small>
                            Duyệt 
                        </Button>
                        <Button 
                        outline 
                        small 
                        >
                            Hủy Bỏ
                            
                        </Button>
                    </div>
                ):(
                    <div></div>
                )
                
            )}
            
        </div>
    );
}

export default StoreView;
