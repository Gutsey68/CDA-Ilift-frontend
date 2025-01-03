import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import Spinner from './components/ui/Spinner';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { router } from './router/router';
import './styles/global.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Spinner />}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster toastOptions={{ className: 'border-neutral-6 border text-neutral-11 bg-neutral-1' }} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Suspense>
);

createRoot(document.getElementById('modal')!).render(<QueryClientProvider client={queryClient}></QueryClientProvider>);
