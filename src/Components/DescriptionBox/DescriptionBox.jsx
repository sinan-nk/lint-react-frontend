import React, { useState } from 'react';
import './DescriptionBox.css'

const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </div>
        <div
          className={`descriptionbox-nav-box ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews (122)
        </div>
      </div>

      {activeTab === 'description' ? (
        <div className="descriptionbox-description">
          <p>
            An e-commerce website is an online platform that facilitates
            the buying and selling of products or services over the internet.
            It serves as a virtual marketplace where businesses and individuals
            can showcase their products, interact with customers, and conduct transactions without
            the need for a physical presence. E-commerce websites have gained immense popularity due to
            their convenience, accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed descriptions,
            images, prices, and any available variations (e.g., sizes, colors). Each product usually has its
            own dedicated page with relevant information.
          </p>
        </div>
      ) : (
        <div className="descriptionbox-description">
          <p>No reviews yet. Be the first to share your thoughts on this product.</p>
        </div>
      )}
    </div>
  )
}

export default DescriptionBox