import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import About from '../pages/About';
import AuthPage from '../pages/AuthPage';
import PageError from '../pages/PageError';
import Profil from '../pages/Profil';
import Thread from '../pages/Thread';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <PageError />,
        children: [
            {
                path: 'tableau-de-bord',
                element: <Thread />
            },
            {
                path: '',
                element: <AuthPage />
            },
            {
                path: 'à-propos',
                element: <About />
            },
            {
                path: 'profil',
                element: <Profil />
            }
        ]
    }
]);
