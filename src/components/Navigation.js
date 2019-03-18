import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav className="navigation">
    <NavLink to='/' exact>Back</NavLink>
  </nav>
);

export default Navigation;
