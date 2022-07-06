import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Drawer from '../../../../components/Modals/DrawerModal/Drawer';

import msg from '../../../../icons/msg.png';
import edit from '../../../../icons/edit.png';

import './card.scss';
import { uploadUrl } from '../../../../api/config';

const Card = ({ userData, setDeleteModal }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const { firstName, lastName, jobTitle, about, email, _id } = userData;
  const { user } = useSelector((state) => state.users);
  const { isAdmin } = user;

  const editProfile = (e) => {
    e.stopPropagation();

    setIsVisible(true);
  };

  const closeDrawer = (e) => {
    if (e?.target) {
      e.target === e.currentTarget && setIsVisible(false);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <>
      {isVisible && (
        <Drawer
          userId={userData._id}
          isOpen={isVisible}
          onDeleteUser={setDeleteModal}
          closeDrawer={closeDrawer}
        />
      )}
      <div
        className='card'
        onClick={() => {
          navigate(`/${_id}`);
        }}
      >
        {isAdmin && (
          <img
            onClick={editProfile}
            className='card_edit'
            data-id={_id}
            src={edit}
            alt='edit'
          />
        )}
        {userData.photo && (
          <img
            className='card_img'
            src={`${uploadUrl}/${userData.photo}`}
            alt='dummy-img'
          />
        )}
        <p className='card_name'>{`${firstName} ${lastName}`} </p>
        <p className='card_position'>{jobTitle}</p>
        <p className='card_summary'>{about}</p>

        <div className='contact'>
          <img className='card_msg' src={msg} alt='msg' />
          <p className='card_mail'>{email}</p>
        </div>
      </div>
    </>
  );
};
export default Card;
