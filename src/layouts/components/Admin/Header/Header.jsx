import { Menu } from '~/components/Menu/Menu';
import { listMenuAdmin } from '~/constant/mock-data';

function Header() {
    return (
        <>
            <h1>Header Admin</h1>
            <Menu data={listMenuAdmin} />
        </>
    );
}

export default Header;
