import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as BackButton} from '../icons/arrow-back.svg';

const Navigation = () => (
  <nav className="navigation">
    <NavLink to='/'><BackButton className="icon-svg" /></NavLink>
  </nav>
);

export default Navigation;
