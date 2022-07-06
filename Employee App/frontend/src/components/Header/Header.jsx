import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout, reset } from '../../api/features/auth/authSlice';

import Drawer from '../Modals/DrawerModal/Drawer';

import logo from '../../icons/logo.png';
import person from '../../icons/person.png';
import logoutImg from '../../icons/logout.png';
import addEmployeeIcon from '../../icons/addEmployee.png';

import './header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { isAdmin } = user;

  const [isVisible, setIsVisible] = useState({
    edit: false,
    add: false,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();

  const handleIsVisible = (fieldName, value) => {
    setIsVisible({
      ...isVisible,
      [fieldName]: value,
    });
  };

  const closeModal = (fieldName, e) => {
    if (e?.target) {
      e.target === e.currentTarget && handleIsVisible(fieldName, false);
    } else {
      handleIsVisible(fieldName, false);
    }
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const onEditMyProfile = () => {
    setCurrentUserId(user._id);
    setIsDrawerOpen(true);
  };

  const closeDrawer = (e) => {
    if (e?.target) {
      if (e.target === e.currentTarget) {
        setIsDrawerOpen(false);
        setCurrentUserId();
      }
    } else {
      setIsDrawerOpen(false);
      setCurrentUserId();
    }
  };

  return (
    <Fragment>
      <Drawer
        yourProfile
        isOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        userId={currentUserId}
      />
      {/* {isVisible.edit && (
        <Drawer
          yourProfile
          isOpen={isVisible.edit}
          closeDrawer={(e) => closeModal('edit', e)}
          userData={user}
        />
      )}
      {isVisible.add && (
        <Drawer
          isOpen={isVisible.add}
          closeDrawer={(e) => closeModal('add', e)}
        />
      )} */}
      <nav className='header'>
        <Link to='/'>
          <img className='header_logo' src={logo} alt='logo' />
        </Link>
        <ul>
          {isAdmin && (
            <li>
              <img
                src={addEmployeeIcon}
                alt='addEmployee'
                onClick={() => setIsDrawerOpen(true)}
              />
            </li>
          )}
          <li>
            <img src={person} alt='editProfile' onClick={onEditMyProfile} />
          </li>
          <li>
            <Link to='/' onClick={onLogout}>
              <img src={logoutImg} alt='logout' />
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};
export default Header;
