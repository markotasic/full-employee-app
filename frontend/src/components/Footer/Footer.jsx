import logo from '../../icons/logo.png';

import './footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <img className='logo' src={logo} alt='logo' />
      <p className='copy'>
        Copyright © 2020 All rights reserved. Teodora Cumpf
      </p>
    </footer>
  );
};
export default Footer;
