import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { login, reset } from '../../api/features/auth/authSlice';

import Button from '../../components/Button/Button';
import FormInput from '../../components/Input/FormInput';
import { inputs } from './inputs';

import logo from '../../icons/logo.png';

import './login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(values));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <div className='login-page'>
      <h2 className='login-page_title'>Welcome</h2>
      <img className='login-page_logo' src={logo} alt='logo' />
      <form className='login-page_input-wrapper' onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <Button>SIGN IN</Button>
      </form>
    </div>
  );
};
export default Login;
