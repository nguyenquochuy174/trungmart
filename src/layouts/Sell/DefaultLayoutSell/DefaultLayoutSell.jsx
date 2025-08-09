import { listMenuSell } from '~/constant/mock-data';
import Footer from '~/layouts/components/Footer/Footer';
import Header from '~/layouts/components/Sell/Header/Header';

function DefaultLayoutSell({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer data={listMenuSell} />
        </>
    );
}

export default DefaultLayoutSell;
