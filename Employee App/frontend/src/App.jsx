import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getLoggedInUser } from './api/features/users/user';

import { getUserFromLocalStorege } from './api/features/auth/authSlice';
import EmployeeView from './pages/EmployeeView/EmployeeView';
import UserDetail from './pages/UserDetail/UserDetail';
import Login from './pages/Login/Login';

function App() {
  const { user, isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (user) {
      dispatch(getLoggedInUser());
    } else {
      dispatch(getUserFromLocalStorege());
    }
  }, [isError, message, dispatch, user]);

  let routes;
  if (user) {
    routes = (
      <>
        <Route path='/' element={<EmployeeView />} />
        <Route path='/:id' element={<UserDetail />} />
        <Route exact={true} path='*' element={<Navigate to='/' />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='/' element={<Login />} />
        <Route exact={true} path='*' element={<Navigate to='/' />} />
      </>
    );
  }

  return <Routes>{routes}</Routes>;
}

export default App;
