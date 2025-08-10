import { listMenuAdmin } from '~/constant/mock-data';
import Header from '~/layouts/components/Admin/Header/Header';
import Footer from '~/layouts/components/Footer/Footer';

function DefaultLayoutAdmin({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer data={listMenuAdmin} />
        </>
    );
}

export default DefaultLayoutAdmin;
