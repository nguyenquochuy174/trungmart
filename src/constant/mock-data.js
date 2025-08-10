import images from '~/assets/images/image';

const listMenuUser = [
    { name: 'Trang Chủ', path: '/UserHome' },
    {
        name: 'Sản Phẩm',
        path: '/UserProduct',
        children: [
            {
                name: 'Đồ khô - Chế biến sẵn',
                path: '/UserProduct/DriedProcessedFoods',
            },
            { name: 'Bánh - Kẹo', path: '/UserProduct/SnacksCandies' },
            {
                name: 'Trái Cây - Rau Củ',
                path: '/UserProduct/FruitsVegetables',
            },
            { name: 'Gia vị', path: '/UserProduct/Spices' },
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
        category: 'Gia vị',
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
        category: 'Bánh kẹo',
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
        category: 'Bánh kẹo',
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
        category: 'Ăn vặt',
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
        category: 'Đồ uống',
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
        category: 'Bánh kẹo',
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
        category: 'Ăn vặt',
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
        category: 'Gia vị',
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
        category: 'Nguyên liệu',
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
        category: 'Món ăn',
        image: [
            { id: 1, url: images.banhLoc.img1, alt: 'Bánh bột lọc Huế' },
            { id: 2, url: images.banhLoc.img2, alt: 'Bánh bột lọc Huế' },
        ],
        totalStars: 100,
        reviews: 23,
    },
];

export { listMenuUser, listMenuAdmin, listMenuSell, listProduct };
