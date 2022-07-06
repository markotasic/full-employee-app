import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../../api/features/users/user';

import useDelay from '../../hooks/use-delay';
import Header from '../../components/Header/Header';
import Card from './components/Card/Card';
import Footer from '../../components/Footer/Footer';
import DeleteOverlay from '../../components/Modals/DeleteOverlay/DeleteOverlay';

import upArrow from '../../icons/up-arrow.png';

import './employeeView.scss';

const EmployeeView = () => {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);

  const { users, isError, message } = useSelector((state) => state.users);

  const hideDeleteModal = () => setDeleteModal(false);

  useDelay(deleteModal, hideDeleteModal);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getUsers());
  }, [isError, message, dispatch]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className='employee-view'>
      <Header />
      {deleteModal && <DeleteOverlay onClick={hideDeleteModal} />}
      <main>
        <div className='card-container'>
          {users.length > 0 &&
            users.map((user) => (
              <Card
                userData={user}
                setDeleteModal={setDeleteModal}
                key={user._id}
              />
            ))}
        </div>
      </main>
      <div className='up-arrow'>
        <img
          onClick={scrollToTop}
          className='up-arrow'
          src={upArrow}
          alt='upArrow'
        />
      </div>
      <Footer />
    </div>
  );
};
export default EmployeeView;
