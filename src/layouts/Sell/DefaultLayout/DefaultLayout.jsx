
import Footer from '~/layouts/components/Footer/Footer';
import Header from '~/layouts/components/Sell/Header/Header';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
