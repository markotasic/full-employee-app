import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getOneUser } from '../../api/features/users/user';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Drawer from '../../components/Modals/DrawerModal/Drawer';
import { uploadUrl } from '../../api/config';

import msg from '../../icons/msg.png';
import locationImg from '../../icons/location.png';
import edit from '../../icons/edit.png';

import './UserDetail.scss';

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const { photo, firstName, lastName, jobTitle, email, adress } = userData;
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useSelector((state) => state.users);
  const { isAdmin } = user;

  const setUserToState = (user) => {
    setUserData(user);
  };

  const closeDrawer = (e) => {
    if (e?.target) {
      e.target === e.currentTarget && setIsVisible(false);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    dispatch(getOneUser({ id, callback: setUserToState }));
  }, [dispatch, id]);

  return (
    <>
      <Header />
      {isVisible && (
        <Drawer
          isOpen={isVisible}
          closeDrawer={closeDrawer}
          userId={userData._id}
        />
      )}
      <div className='main'>
        {isAdmin && (
          <img
            className='edit'
            onClick={() => setIsVisible(true)}
            src={edit}
            alt='edit'
          />
        )}
        <div className='main__left'>
          <div className='main__left--container'>
            {photo && <img src={`${uploadUrl}/${photo}`} alt='avatar' />}
            <div>
              <h2>
                {firstName} {lastName}
              </h2>
              <p>{jobTitle}</p>
            </div>
          </div>
        </div>
        <div className='main__right'>
          <h2>A little bit about {firstName}</h2>
          <p>
            Peius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam
            quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
            exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
            ex ea commodi consequatur? Peius modi tempora inci[di]dunt, ut
            labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
            minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur?{' '}
          </p>

          <div className='main__right__contactInfo'>
            <span className='main__right__contactInfo--mail'>
              <img src={msg} alt='msg' />
              {email}
            </span>
            <span className='main__right__contactInfo--mail'>
              <img src={locationImg} alt='location' />
              {adress}
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDetail;
