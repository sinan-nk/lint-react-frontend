import React from 'react';
import './Breadcrum.css';
import { Link } from 'react-router-dom';
import arrow_icon from '../Assets/breadcrum_arrow.png';


const Breadcrum = (props) => {
    const {product}=props;
  return (
    <div className='breadcrum'>
  <Link to="/">HOME</Link>
  <img src={arrow_icon} alt="" />
  <Link to={`/${product.category}s`}>{product.category}</Link>
  <img src={arrow_icon} alt="" />
  <span>{product.name}</span>
</div>
  )
}

export default Breadcrum
