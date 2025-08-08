import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayoutUser from './layouts/User/DefaultLayoutUser/DefaultLayoutUser';
import { publicRoutes } from './routes/routes';
import DefaultLayoutSell from './layouts/Sell/DefaultLayoutSell/DefaultLayoutSell';
import DefaultLayoutAdmin from './layouts/Admin/DefaultLayoutAdmin/DefaultLayoutAdmin';
const inweb = 'user';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayoutUser;
                        if (inweb === 'sell') {
                            Layout = DefaultLayoutSell;
                        } else if (inweb === 'admin') {
                            Layout = DefaultLayoutAdmin;
                        }
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}
export default App;
