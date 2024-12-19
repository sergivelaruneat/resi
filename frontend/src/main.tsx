import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/Login.tsx';
import SignUp from './routes/SignUp.tsx';
import Home from './routes/Home.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';


const router = createBrowserRouter([
  {
    path:"/",
    element: <Login />
  },
  {
    path:"/SignUp",
    element: <SignUp />
  },
  {
    path:"/",
    element: <ProtectedRoute />,
    children: [
      {
        path:"/Home",
        element: <Home />,     
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
