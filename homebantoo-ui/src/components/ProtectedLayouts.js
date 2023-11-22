import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../firebase/authservice';

export default function ProtectedLayout(){
  const { user } = UserAuth();
  if (!user) return <Navigate to='/login' replace/>;
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}