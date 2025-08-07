
import Header from '~/layouts/components/Admin/Header/Header';
import Footer from '~/layouts/components/Footer/Footer';

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
