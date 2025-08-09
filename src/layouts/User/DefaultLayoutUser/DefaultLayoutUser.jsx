import { listMenuUser } from '~/constant/mock-data';
import Footer from '~/layouts/components/Footer/Footer';
import Header from '~/layouts/components/User/Header/Header';

function DefaultLayoutUser({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer data={listMenuUser} />
        </>
    );
}

export default DefaultLayoutUser;
