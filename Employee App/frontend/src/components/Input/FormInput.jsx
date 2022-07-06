import { useState } from 'react';

import './formInput.scss';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, image, value, ...inputProps } =
    props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className='formInput'>
      <label className='label'>{label}</label>
      {image && <img className='image' src={image} alt='label' />}
      <input
        style={{ paddingLeft: image && '3rem' }}
        className='input'
        {...inputProps}
        value={value || ''}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className='span'>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
