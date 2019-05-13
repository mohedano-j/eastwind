import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="jumbotron">
  <h1>Product Administration</h1>
  <p>Product Administration to demo React, Redux and React Router in ES6 for ultra-responsive web apps.</p>
  <Link to="about" className="btn btn-primary btn-lg">Learn more aaa</Link>
</div>

);

export default HomePage;
