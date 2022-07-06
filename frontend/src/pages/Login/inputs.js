import userIcon from '../../icons/user.png';
import passwordIcon from '../../icons/password.png';

export const inputs = [
  {
    id: 1,
    name: 'email',
    type: 'email',
    errorMessage: 'It should be a valid email address!',
    placeholder: 'E-mail',
    required: true,
    image: userIcon,
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    errorMessage:
      'Password should be at least 8 characters and include at least 1 letter, 1 number and 1 special character!',
    placeholder: 'Password',
    // pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    required: true,
    image: passwordIcon,
  },
];
