import camera from '../../icons/camera.png';

import './imageUpload.scss';

const ImageUpload = ({ previewUrl, pickedHandler, onChange }) => {
  return (
    <li className='upload'>
      {previewUrl.length > 0 ? (
        <img className='drawer_user-img' src={previewUrl} alt='dummy img' />
      ) : (
        <label className='image-label' htmlFor='upload-photo'>
          <div className='no-image' />
        </label>
      )}
      <label className='upload-label' htmlFor='upload-photo'>
        <img src={camera} alt='camera' />
        Update profile photo
      </label>
      <input
        type='file'
        name='photo'
        className='upload-photo'
        id='upload-photo'
        accept='image/png, image/jpeg, image/jpg />'
        onChange={(e) => {
          pickedHandler(e);
          onChange(e);
        }}
      />
    </li>
  );
};
export default ImageUpload;
