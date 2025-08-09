// Huy
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

// An
const listMenuAdmin = [
    { name: 'Thống Kế', path: '/StatisAdmin' },
    { name: 'Giới Thiệu', path: '/IntroduceAdmin' },
    { name: 'Quản Lý', path: '/ManagerUser' },
];

const listMenuSell = [
    { name: 'Sản Phẩm', path: '/ProductSell' },
    { name: 'Giới Thiệu', path: '/IntroduceSell' },
];

export { listMenuUser, listMenuAdmin, listMenuSell };
