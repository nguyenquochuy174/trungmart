import Button from '~/components/Button/Button';
import styles from "./SliderBarProduct.module.scss"
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function SliderBarProduct() {
    return <div className={cx('container')}
    ><a href="/AddProductSell"><Button outline small >
                                Thêm Sản Phẩm +
                </Button></a></div>;
}

export default SliderBarProduct;
