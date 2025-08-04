import Footer from '~/layouts/components/User/Footer/Footer';
import Header from '~/layouts/components/User/Header/Header';

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
