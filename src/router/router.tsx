import { createBrowserRouter, Outlet } from 'react-router-dom';
import NotAuthenticatedRoute from '../components/auth/NotAuthenticatedRoute';
import PrivateRoute from '../components/auth/PrivateRoute';
import Layout from '../components/layout/Layout';
import AboutPage from '../pages/AboutPage.tsx';
import ExerciceDetailPage from '../pages/ExerciceDetailPage';
import ExercicesPage from '../pages/ExercicesPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import LandingPage from '../pages/LandingPage';
import LegalPage from '../pages/LegalPage.tsx';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/Page404';
import ParametresPage from '../pages/ParametresPage.tsx';
import ProfilPage from '../pages/ProfilePage.tsx';
import ProgramDetailPage from '../pages/ProgramDetailPage';
import ProgramsPage from '../pages/ProgramsPage';
import RegisterPage from '../pages/RegisterPage';
import Thread from '../pages/Thread';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Page404 />,
    children: [
      {
        path: '',
        element: <NotAuthenticatedRoute />,
        children: [
          {
            path: '',
            element: <LandingPage />
          }
        ]
      },
      {
        path: '/mentions-legales',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <LegalPage />
          }
        ]
      },
      {
        path: '/a-propos',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <AboutPage />
          }
        ]
      },
      {
        path: 'accueil',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <Thread />
          }
        ]
      },
      {
        path: 'profil/:id',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <ProfilPage />
          }
        ]
      },
      {
        path: 'parametres/:id',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <ParametresPage />
          }
        ]
      },
      {
        path: 'programmes',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <ProgramsPage />
          },
          {
            path: ':id',
            element: <PrivateRoute />,
            children: [
              {
                path: '',
                element: <ProgramDetailPage />
              },
              {
                path: 'exercices',
                element: <PrivateRoute />,
                children: [
                  {
                    path: '',
                    element: <ExercicesPage />
                  },
                  {
                    path: ':id',
                    element: <ExerciceDetailPage />
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'connexion',
    element: <NotAuthenticatedRoute />,
    children: [
      {
        path: '',
        element: <LoginPage />
      }
    ]
  },
  {
    path: 'inscription',
    element: <NotAuthenticatedRoute />,
    children: [
      {
        path: '',
        element: <RegisterPage />
      }
    ]
  },
  {
    path: 'mot-de-passe-oublie',
    element: <NotAuthenticatedRoute />,
    children: [
      {
        path: '',
        element: <ForgotPasswordPage />
      }
    ]
  }
]);
