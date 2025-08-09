import { Menu } from '~/components/Menu/Menu';
import { listMenuSell } from '~/constant/mock-data';

function Header() {
    return (
        <>
            <h1>Header Sell</h1>
            <Menu data={listMenuSell} />
        </>
    );
}

export default Header;
