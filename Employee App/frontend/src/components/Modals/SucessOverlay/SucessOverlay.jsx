import check from '../../../icons/checkMark.png';

import './sucessOverlay.scss';

const SucessOverlay = ({ message, onClose }) => {
  return (
    <div className='sucess-overlay' onClick={onClose}>
      <img className='sucess-overlay_check' src={check} alt='sucess' />
      <h2 className='sucess-overlay_message'>{message}</h2>
    </div>
  );
};
export default SucessOverlay;
