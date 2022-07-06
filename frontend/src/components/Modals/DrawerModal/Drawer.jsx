import { useState, useEffect } from 'react';

import useDelay from '../../../hooks/use-delay';
import Form from '../../Form/Form';
import SucessOverlay from '../SucessOverlay/SucessOverlay';

import close from '../../../icons/close.png';

import './drawer.scss';

const Drawer = (props) => {
  const { isOpen, closeDrawer, onDeleteUser, yourProfile, userId } = props;

  const [modalsState, setModalState] = useState({
    updateModal: false,
    createModal: false,
  });

  const handleModalStateChange = (fieldName, value) => {
    if (fieldName === 'deleteModal') {
      return onDeleteUser(value);
    }

    setModalState({
      ...modalsState,
      [fieldName]: value,
    });
  };

  useDelay(modalsState.updateModal, closeDrawer);
  useDelay(modalsState.createModal, closeDrawer);

  useEffect(() => {
    if (!isOpen) {
      setModalState({
        updateModal: false,
        createModal: false,
      });
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div onClick={closeDrawer} className={`overlay is-visible`}>
          {modalsState.updateModal && yourProfile && (
            <SucessOverlay
              onClose={closeDrawer}
              message={'Your profile has been updated!'}
            />
          )}
          {modalsState.updateModal && !yourProfile && (
            <SucessOverlay
              onClose={closeDrawer}
              message={'Profile has been updated!'}
            />
          )}
          {modalsState.createModal && (
            <SucessOverlay
              onClose={closeDrawer}
              message={'New profile has been created!'}
            />
          )}
          <aside className='drawer'>
            <img
              className='close'
              src={close}
              alt='close'
              onClick={closeDrawer}
            />
            <Form userId={userId} changeModal={handleModalStateChange} />
          </aside>
        </div>
      )}
    </>
  );
};
export default Drawer;
