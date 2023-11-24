import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Navigate } from 'react-router-dom';
// import { UserAuth } from '../firebase/authservice';
import { useGetUserInfo } from '../hooks/useGetUserInfo';

export default function ProtectedLayout(){
  const { isAuth } = useGetUserInfo();
  
  if (!isAuth) return <Navigate to='/login' replace/>;
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}