const MenuUser = () => {
    const menuList = [
        { name: 'Trang Chủ', path: '/UserHome' },
        { name: 'Sản Phẩm', path: '/UserProduct' },
        { name: 'Giới Thiệu', path: '/UserIntroduce' },
    ];

    return (
        <ul>
            {menuList.map((item, index) => (
                <li key={index}>
                    <a href={item.path}>{item.name}</a>
                </li>
            ))}
        </ul>
    );
};

export { MenuUser };
