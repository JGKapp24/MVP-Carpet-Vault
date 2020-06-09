import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div>
    <Link
      to="/"
      className="header"
    >
      <img className="header-logo" alt="logo" src="/carpet.png" />
      <h2 className="header-title">Carpet Vault</h2>
    </Link>
    <hr />
  </div>
);

export default Header;
