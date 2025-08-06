import Footer from '~/layouts/components/Sell/Footer/Footer';
import Header from '~/layouts/components/Sell/Header/Header';

function DefaultLayoutNotification({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayoutNotification;
