const MenuAdmin = () => {
    const menuList = [
        { name: 'Thống Kê', path: '/StatisAdmin' },
        { name: 'Giới Thiệu', path: '/IntroduceAdmin' },
        { name: 'Quản Lý', path: '/ManagerUser' },
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

export { MenuAdmin };