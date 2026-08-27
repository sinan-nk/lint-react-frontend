import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/all_product'
import Item from '../Item/Item'

const RelatedProducts = ({category ,currentId}) => {
  console.log(data_product);
  
  const related = data_product.filter((item)=>item.category === category && item.id !== currentId).slice(0,6);

  return (
    <div className='relatedproducts'>
      <span className="relatedproducts-eyebrow">You might also like</span>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts