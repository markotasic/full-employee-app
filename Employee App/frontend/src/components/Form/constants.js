export const inputs = [
  {
    id: 1,
    name: 'firstName',
    type: 'text',
    errorMessage:
      "First name should be 2-16 characters and shouldn't include any special character!",
    label: 'First name',
    pattern: '^[A-Za-z0-9]{2,16}$',
    required: true,
  },
  {
    id: 2,
    name: 'lastName',
    type: 'text',
    errorMessage:
      "Last name should be 2-16 characters and shouldn't include any special character!",
    label: 'Last name',
    pattern: '^[A-Za-z0-9]{2,16}$',
    required: true,
  },
  {
    id: 3,
    name: 'email',
    type: 'email',
    errorMessage: 'It should be a valid email address!',
    label: 'E-mail',
    required: true,
  },
  {
    id: 4,
    name: 'password',
    type: 'password',
    errorMessage:
      'Password should be at least 8 characters and include at least 1 letter, 1 number and 1 special character!',
    label: 'Password',
    pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$',
    required: true,
  },
  {
    id: 5,
    name: 'phoneNumber',
    type: 'text',
    errorMessage: 'It should be a valid phone number!',
    label: 'Phone number',
    pattern: '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$',
    required: true,
  },
  {
    id: 6,
    name: 'adress',
    type: 'text',
    errorMessage:
      "Adress should be 5-30 characters and shouldn't include any special character!",
    label: 'Adress',
    minLength: '5',
    maxLength: '30',
    required: true,
  },
  {
    id: 7,
    name: 'jobTitle',
    type: 'text',
    errorMessage:
      "Job title should be 5-30 characters and shouldn't include any special character!",
    label: 'Job title',
    minLength: '5',
    maxLength: '30',
    required: true,
  },
];
