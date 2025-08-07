const MenuSell = () => {
    const menuList = [
        { name: 'Sản Phẩm', path: '/ProductSell' },
        { name: 'Giới Thiệu', path: '/IntroduceSell' },
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

export { MenuSell };