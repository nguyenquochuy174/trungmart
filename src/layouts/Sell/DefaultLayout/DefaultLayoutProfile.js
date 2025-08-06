import Footer from '~/layouts/components/Sell/Footer/Footer';
import Header from '~/layouts/components/Sell/Header/Header';
function DefaultLayoutProfile({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayoutProfile;
