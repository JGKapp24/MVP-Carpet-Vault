import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home">
    <img className="logo" alt="logo" src="/carpet.png" />
    <h1 className="tilte">CARPET VAULT</h1>
    <h5>For all your carpet warehouse tracking needs</h5>
    <div className="home-links">
      <Link to="/shipments">My Current Shipments</Link>
    </div>
    <div className="image-credit">
      Icons made by
      {' '}
      <a href="http://www.freepik.com/" title="Freepik">Freepik</a>
      {' '}
      from
      <a href="https://www.flaticon.com/" title="Flaticon">
        {' '}
        www.flaticon.com
      </a>
    </div>
  </div>
);

export default Home;
