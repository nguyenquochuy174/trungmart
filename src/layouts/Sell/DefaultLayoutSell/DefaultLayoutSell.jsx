import Footer from '~/layouts/components/Footer/Footer';
import Header from '~/layouts/components/Sell/Header/Header';

function DefaultLayoutSell({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayoutSell;
