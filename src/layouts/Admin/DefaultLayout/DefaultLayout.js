import Footer from '~/layouts/components/Admin/Footer/Footer';
import Header from '~/layouts/components/Admin/Header/Header';

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
