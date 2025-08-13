import {
    faCircleExclamation,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/image';
const listMenuUser = [
    { name: 'Trang Chủ', path: '/UserHome' },
    {
        name: 'Sản Phẩm',
        path: '/UserProduct',
        children: [
            {
                name: 'Đồ khô - Chế biến sẵn',
                path: '/UserProduct?category=dried',
                categoryKey: 'dried',
            },
            {
                name: 'Bánh - Kẹo',
                path: '/UserProduct?category=snacks',
                categoryKey: 'snacks',
            },
            {
                name: 'Trái Cây - Rau Củ',
                path: '/UserProduct?category=fruits',
                categoryKey: 'fruits',
            },
            {
                name: 'Gia vị',
                path: '/UserProduct?category=spices',
                categoryKey: 'spices',
            },
            {
                name: 'Đồ uống',
                path: '/UserProduct?category=drinks',
                categoryKey: 'drinks',
            },
        ],
    },
    { name: 'Giới Thiệu', path: '/UserIntroduce' },
];

const listMenuAdmin = [
    { name: 'Thống Kế', path: '/StatisAdmin' },
    { name: 'Giới Thiệu', path: '/IntroduceAdmin' },
    { name: 'Quản Lý', path: '/ManagerUser' },
];

const listMenuSell = [
    { name: 'Sản Phẩm', path: '/ProductSell' },
    { name: 'Giới Thiệu', path: '/IntroduceSell' },
];

const listProduct = [
    {
        id: 1,
        name: 'Nước mắm Nam Ô',
        quantity: 50,
        price: 80000,
        description:
            'Nước mắm Nam Ô Đà Nẵng làm từ cá cơm than, hương vị đậm đà đặc trưng.',
        category: 'spices',
        area: 'danang',
        image: [{ id: 1, url: images.nuocMam, alt: 'Nước mắm Nam Ô' }],
        totalStars: 100,
        reviews: 20,
    },
    {
        id: 2,
        name: 'Mè xửng Huế',
        quantity: 40,
        price: 65000,
        description:
            'Mè xửng dẻo thơm, vị ngọt bùi của mạch nha, mè rang vàng óng, đặc sản truyền thống xứ Huế.',
        category: 'snacks',
        area: 'hue',
        image: [{ id: 1, url: images.meXungHue, alt: 'Mè xửng Huế' }],
        totalStars: 120,
        reviews: 25,
    },
    {
        id: 3,
        name: 'Kẹo cu đơ Hà Tĩnh',
        quantity: 30,
        price: 180000,
        description:
            'Kẹo cu đơ giòn rụm, nhân lạc và mạch nha ngọt bùi, đặc sản nổi tiếng của Hà Tĩnh.',
        category: 'snacks',
        area: 'hatinh',
        image: [{ id: 1, url: images.keoCuDo, alt: 'Kẹo cu đơ Hà Tĩnh' }],
        totalStars: 80,
        reviews: 18,
    },
    {
        id: 4,
        name: 'Bánh tráng mè nướng Quảng Nam',
        quantity: 70,
        price: 25000,
        description: 'Bánh tráng giòn rụm, thơm mùi mè rang đặc sản Quảng Nam.',
        category: 'snacks',
        area: 'quangnam',
        image: [{ id: 1, url: images.banhTrang, alt: 'Bánh tráng mè nướng' }],
        totalStars: 80,
        reviews: 19,
    },
    {
        id: 5,
        name: 'Trà cung đình Huế',
        quantity: 90,
        price: 90000,
        description:
            'Trà thảo mộc cung đình Huế kết hợp nhiều loại dược liệu quý.',
        category: 'drinks',
        area: 'hue',
        image: [{ id: 1, url: images.tra, alt: 'Trà cung đình Huế' }],
        totalStars: 100,
        reviews: 21,
    },
    {
        id: 6,
        name: 'Kẹo đậu phộng Quảng Ngãi',
        quantity: 100,
        price: 20000,
        description:
            'Kẹo truyền thống làm từ đậu phộng và đường mạch nha đặc sản Quảng Ngãi.',
        category: 'snacks',
        area: 'quangngai',
        image: [{ id: 1, url: images.keoDauPhong, alt: 'Kẹo đậu phộng' }],
        totalStars: 150,
        reviews: 33,
    },
    {
        id: 7,
        name: 'Me xí muội Huế',
        quantity: 60,
        price: 30000,
        description: 'Me chua ngọt xí muội, ăn vặt hấp dẫn của xứ Huế.',
        category: 'snacks',
        area: 'hue',
        image: [{ id: 1, url: images.meXiMuoi, alt: 'Me xí muội Huế' }],
        totalStars: 200,
        reviews: 45,
    },
    {
        id: 8,
        name: 'Mắm ruốc Huế',
        quantity: 35,
        price: 50000,
        description:
            'Mắm ruốc Huế lên men tự nhiên, hương vị đậm đà đặc trưng.',
        category: 'spices',
        area: 'hue',
        image: [{ id: 1, url: images.mamRuot, alt: 'Mắm ruốc Huế' }],
        totalStars: 100,
        reviews: 22,
    },
    {
        id: 9,
        name: 'Hạt sen Huế sấy khô',
        quantity: 50,
        price: 75000,
        description:
            'Hạt sen khô thơm bùi, dùng nấu chè hoặc ăn vặt, đặc sản Huế.',
        category: 'dried',
        area: 'hue',
        image: [{ id: 1, url: images.hatSen, alt: 'Hạt sen' }],
        totalStars: 100,
        reviews: 25,
    },
    {
        id: 10,
        name: 'Bánh bột lọc Huế',
        quantity: 25,
        price: 45000,
        description: 'Bánh bột lọc nhân tôm thịt, dẻo thơm chuẩn vị Huế.',
        category: 'dried',
        area: 'hue',
        image: [
            { id: 1, url: images.banhLoc.img1, alt: 'Bánh bột lọc Huế' },
            { id: 2, url: images.banhLoc.img2, alt: 'Bánh bột lọc Huế' },
        ],
        totalStars: 100,
        reviews: 23,
    },
    {
        id: 11,
        name: 'Nước mắm Nam Ô',
        quantity: 50,
        price: 80000,
        description:
            'Nước mắm Nam Ô Đà Nẵng làm từ cá cơm than, hương vị đậm đà đặc trưng.',
        category: 'spices',
        area: 'danang',
        image: [{ id: 1, url: images.nuocMam, alt: 'Nước mắm Nam Ô' }],
        totalStars: 100,
        reviews: 20,
    },
    {
        id: 12,
        name: 'Mè xửng Huế',
        quantity: 40,
        price: 65000,
        description:
            'Mè xửng dẻo thơm, vị ngọt bùi của mạch nha, mè rang vàng óng, đặc sản truyền thống xứ Huế.',
        category: 'snacks',
        area: 'hue',
        image: [{ id: 1, url: images.meXungHue, alt: 'Mè xửng Huế' }],
        totalStars: 120,
        reviews: 25,
    },
    {
        id: 13,
        name: 'Kẹo cu đơ Hà Tĩnh',
        quantity: 30,
        price: 180000,
        description:
            'Kẹo cu đơ giòn rụm, nhân lạc và mạch nha ngọt bùi, đặc sản nổi tiếng của Hà Tĩnh.',
        category: 'snacks',
        area: 'hatinh',
        image: [{ id: 1, url: images.keoCuDo, alt: 'Kẹo cu đơ Hà Tĩnh' }],
        totalStars: 80,
        reviews: 18,
    },
    {
        id: 14,
        name: 'Bánh tráng mè nướng Quảng Nam',
        quantity: 70,
        price: 25000,
        description: 'Bánh tráng giòn rụm, thơm mùi mè rang đặc sản Quảng Nam.',
        category: 'snacks',
        area: 'quangnam',
        image: [{ id: 1, url: images.banhTrang, alt: 'Bánh tráng mè nướng' }],
        totalStars: 80,
        reviews: 19,
    },
    {
        id: 15,
        name: 'Trà cung đình Huế',
        quantity: 90,
        price: 90000,
        description:
            'Trà thảo mộc cung đình Huế kết hợp nhiều loại dược liệu quý.',
        category: 'drinks',
        area: 'hue',
        image: [{ id: 1, url: images.tra, alt: 'Trà cung đình Huế' }],
        totalStars: 100,
        reviews: 21,
    },
    {
        id: 16,
        name: 'Kẹo đậu phộng Quảng Ngãi',
        quantity: 100,
        price: 20000,
        description:
            'Kẹo truyền thống làm từ đậu phộng và đường mạch nha đặc sản Quảng Ngãi.',
        category: 'snacks',
        area: 'quangngai',
        image: [{ id: 1, url: images.keoDauPhong, alt: 'Kẹo đậu phộng' }],
        totalStars: 150,
        reviews: 33,
    },
    {
        id: 17,
        name: 'Me xí muội Huế',
        quantity: 60,
        price: 30000,
        description: 'Me chua ngọt xí muội, ăn vặt hấp dẫn của xứ Huế.',
        category: 'snacks',
        area: 'hue',
        image: [{ id: 1, url: images.meXiMuoi, alt: 'Me xí muội Huế' }],
        totalStars: 200,
        reviews: 45,
    },
    {
        id: 18,
        name: 'Mắm ruốc Huế',
        quantity: 35,
        price: 50000,
        description:
            'Mắm ruốc Huế lên men tự nhiên, hương vị đậm đà đặc trưng.',
        category: 'spices',
        area: 'hue',
        image: [{ id: 1, url: images.mamRuot, alt: 'Mắm ruốc Huế' }],
        totalStars: 100,
        reviews: 22,
    },
    {
        id: 19,
        name: 'Hạt sen Huế sấy khô',
        quantity: 50,
        price: 75000,
        description:
            'Hạt sen khô thơm bùi, dùng nấu chè hoặc ăn vặt, đặc sản Huế.',
        category: 'dried',
        area: 'hue',
        image: [{ id: 1, url: images.hatSen, alt: 'Hạt sen' }],
        totalStars: 100,
        reviews: 25,
    },
    {
        id: 20,
        name: 'Bánh bột lọc Huế',
        quantity: 25,
        price: 45000,
        description: 'Bánh bột lọc nhân tôm thịt, dẻo thơm chuẩn vị Huế.',
        category: 'dried',
        area: 'hue',
        image: [
            { id: 1, url: images.banhLoc.img1, alt: 'Bánh bột lọc Huế' },
            { id: 2, url: images.banhLoc.img2, alt: 'Bánh bột lọc Huế' },
        ],
        totalStars: 100,
        reviews: 23,
    },
];

const reportForm = [
    {
        id: 'report',
        icon: faCircleExclamation,
        title: 'Báo cáo cửa hàng',
        description:
            'Khi bạn “Xác Nhận” thì nội dung báo cáo sẽ được gửi đến Quản Trị Viên. Quản Trị Viên sẽ xem xét và xử lý.',
    },
    {
        id: 'cancel',
        icon: faTriangleExclamation,
        title: 'Hủy đơn hàng',
        description:
            'Khi bạn “Xác Nhận” thì đơn hàng sẽ bị xóa. Thông báo gửi đến Chủ Cửa Hàng.',
    },
    {
        id: 'feedback',
        title: 'Đánh giá đơn hàng',
        star: true,
    },
];

const slideImage = [
    images.thucPhamSach.img1,
    images.thucPhamSach.img2,
    images.thucPhamSach.img3,
];

const featuredCategories = [
    {
        id: 1,
        image: images.danhMucNoiBat.img1,
        title: 'Gia vị',
    },
    {
        id: 2,
        image: images.danhMucNoiBat.img2,
        title: 'Trái cây - Rau củ',
    },
    {
        id: 3,
        image: images.danhMucNoiBat.img3,
        title: 'Bánh kẹo',
    },
    {
        id: 4,
        image: images.danhMucNoiBat.img4,
        title: 'Đồ khô - Chế biến sẵn',
    },
];

const listSelect = [
    {
        id: 1,
        name: 'Giá tiền',
        children: [
            { label: 'Dưới 100.000', value: [0, 100000], queryKey: 'price' },
            {
                label: '100.000 - 200.000',
                value: [100000, 200000],
                queryKey: 'price',
            },
            {
                label: '200.000 - 500.000',
                value: [200000, 500000],
                queryKey: 'price',
            },
            {
                label: 'Trên 500.000',
                value: [500000, Infinity],
                queryKey: 'price',
            },
        ],
    },
    {
        id: 2,
        name: 'Khu vực',
        children: [
            { label: 'Thanh Hóa', value: 'thanhhoa', queryKey: 'area' },
            { label: 'Nghệ An', value: 'nghean', queryKey: 'area' },
            { label: 'Hà Tĩnh', value: 'hatinh', queryKey: 'area' },
            { label: 'Quảng Bình', value: 'quangbinh', queryKey: 'area' },
            { label: 'Quảng Trị', value: 'quangtri', queryKey: 'area' },
            { label: 'Huế', value: 'hue', queryKey: 'area' },
            { label: 'Đà Nẵng', value: 'danang', queryKey: 'area' },
            { label: 'Quảng Nam', value: 'quangnam', queryKey: 'area' },
            { label: 'Quảng Ngãi', value: 'quangngai', queryKey: 'area' },
            { label: 'Bình Định', value: 'binhdinh', queryKey: 'area' },
            { label: 'Phú Yên', value: 'phuyen', queryKey: 'area' },
            { label: 'Khánh Hòa', value: 'khanhhoa', queryKey: 'area' },
            { label: 'Ninh Thuận', value: 'ninhthuan', queryKey: 'area' },
            { label: 'Bình Thuận', value: 'binhthuan', queryKey: 'area' },
        ],
    },
    {
        id: 3,
        name: 'Trạng thái',
        children: [
            { label: 'Đã hủy', value: 'cancelled', queryKey: 'status' },
            { label: 'Đã duyệt', value: 'approved', queryKey: 'status' },
            { label: 'Đang chờ duyệt', value: 'pending', queryKey: 'status' },
            { label: 'Đang giao hàng', value: 'shipping', queryKey: 'status' },
        ],
    },
];

export {
    listMenuUser,
    listMenuAdmin,
    listMenuSell,
    listProduct,
    reportForm,
    slideImage,
    featuredCategories,
    listSelect,
};
