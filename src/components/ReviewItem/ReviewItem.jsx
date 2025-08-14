import classNames from 'classnames/bind';
import styles from './ReviewItem.module.scss';
import { listUser, listReviewProduct } from '~/constant/mock-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ReviewItem({ data: productId }) {
    const id = Number(productId);
    const reviews = listReviewProduct.filter(
        (review) => review.idProduct === id,
    );
    if (!reviews || reviews.length === 0) {
        return (
            <div className={cx('noReviewMessage')}>
                Chưa có đánh giá nào cho sản phẩm này.
            </div>
        );
    }

    return (
        <>
            {reviews.map((review, index) => {
                const user = listUser.find((user) => user.id === review.idUser);
                if (!user) return null;

                return (
                    <div key={index} className={cx('reviewItem')}>
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className={cx('avatar')}
                        />
                        <div className={cx('reviewContent')}>
                            <div className={cx('reviewHeader')}>
                                <div className={cx('userInfo')}>
                                    <span className={cx('reviewName')}>
                                        {user.name}
                                    </span>
                                    <div className={cx('reviewStars')}>
                                        {[...Array(5)].map((_, i) =>
                                            i < review.stars ? (
                                                <FontAwesomeIcon
                                                    key={i}
                                                    icon={faStar}
                                                    className={cx('starIcon')}
                                                />
                                            ) : null,
                                        )}
                                    </div>
                                </div>
                                <span className={cx('reviewTime')}>
                                    {new Date(
                                        review.createdAt,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <p className={cx('reviewText')}>{review.content}</p>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default ReviewItem;
