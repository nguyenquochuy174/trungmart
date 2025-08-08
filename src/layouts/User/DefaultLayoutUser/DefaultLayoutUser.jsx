import Footer from '~/layouts/components/Footer/Footer';
import Header from '~/layouts/components/User/Header/Header';

function DefaultLayoutUser({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayoutUser;
