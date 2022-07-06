import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  createUser,
  deleteUser,
  getOneUser,
  updateUser,
} from '../../api/features/users/user';

import FormInput from '../Input/FormInput';
import Button from '../Button/Button';
import ImageUpload from '../ImageUpload/ImageUpload';
import { inputs } from './constants';
import { uploadUrl } from '../../api/config';

import './form.scss';

const Form = ({ userId, changeModal }) => {
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState();
  const [values, setValues] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const { user } = useSelector((state) => state.users);
  const { isAdmin } = user;

  // ================ Image upload logic ================ \\
  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const pickedHandler = (e) => {
    let file = e.target.files;

    var reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file[0]);
  };

  // ================ Image upload logic ================ \\

  const updateCallback = () => {
    changeModal('updateModal', true);
  };

  const createCallback = () => {
    changeModal('createModal', true);
  };

  // disptach create user
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    selectedFile && fd.append('photo', selectedFile, selectedFile.name);
    for (var key in values) {
      if (key === 'password') {
        if (oldPassword === values[key]) continue;
      }
      fd.append(key, values[key]);
    }

    if (userId) {
      dispatch(
        updateUser({ userData: fd, callback: updateCallback, id: userId })
      );
    } else {
      dispatch(createUser({ userData: fd, callback: createCallback }));
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const deleteCallback = () => {
    changeModal('deleteModal', true);
  };

  const deleteUserHandler = (e) => {
    const id = e.target.dataset.id;

    dispatch(deleteUser({ callback: deleteCallback, id }));
  };

  const renderFormInputs = () => {
    return inputs.map((input) => {
      let value;
      if (values) value = values[input.name];

      if (value && input.name === 'password') value = value.slice(0, 20);
      return (
        <FormInput
          key={input.id}
          {...input}
          value={value}
          onChange={onChange}
        />
      );
    });
  };

  const getUserCallback = useCallback(
    (userData) => {
      if (userId) {
        setValues({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          phoneNumber: userData.phoneNumber,
          adress: userData.adress,
          jobTitle: userData.jobTitle,
        });

        setOldPassword(userData.password);
        setPreviewUrl(`${uploadUrl}/${userData.photo}`);
      }
    },
    [userId]
  );

  useEffect(() => {
    if (userId) {
      dispatch(getOneUser({ id: userId, callback: getUserCallback }));
    }
  }, [dispatch, userId, getUserCallback]);

  return (
    <form className='form' onSubmit={handleSubmit} data-id={userId}>
      <ImageUpload
        previewUrl={previewUrl}
        pickedHandler={pickedHandler}
        onChange={fileSelectedHandler}
      />
      {renderFormInputs()}

      <div className='btn-container'>
        {!userId && (
          <Button style={{ position: 'absolute', right: 0, bottom: 0 }}>
            Create profile
          </Button>
        )}
        {userId && <Button>Update profile</Button>}
        {isAdmin && userId && (
          <Button onClick={deleteUserHandler} data-id={userId} type='button'>
            Delete profile
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;
