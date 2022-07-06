import trash from '../../../icons/trash.png';

import './deleteOverlay.scss';

const DeleteOverlay = ({ onClick }) => {
  return (
    <div className={`modal-wrap js-modal is-visible`} onClick={onClick}>
      <img className='action' src={trash} alt='sucess' />
      <h2 className='message'>Profile has been successfully deleted!</h2>
    </div>
  );
};
export default DeleteOverlay;
