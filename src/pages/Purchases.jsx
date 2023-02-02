import React from 'react';
import axios from 'axios';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';



const Purchases = () => {

  const dispatch = useDispatch()

  const [purchases, setPurchases] = useState([])

  useEffect(() => {

    dispatch(setIsLoading(true))

    axios
      .get('https://e-commerce-api.academlo.tech/api/v1/purchases', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((resp) =>{
        console.log(resp.data.data.purchases)
        setPurchases(resp.data.data.purchases)}) //ver con cuidado la respuesta
      .catch((resp) => console.log(resp))
      .finally(() => dispatch(setIsLoading(false)))
  }, [])
  

  return (
    <div className='content-purchase'
    >
      <section className='section-name-purchase'>
        <Link  to={"/"}
        style= {{
          textDecoration:"none"
        }}> 
        <h4>Home</h4> </Link>
        <div style={{
          background: "var(--secondary--color)",
          borderRadius: "50%",
          height: "6px",
          margin: "  14px",
          width: "6px"
        }}
        ></div>
        <h4>Purchases</h4>
      </section>
      <div>

        <h3 className='my-purchase'>My Purchase</h3>

      </div>

        {
          purchases?.map((element, index)=> 
          
          <ul key={index} className='ul-purchase'>
            <li className='li-purchase'>
            {
              element?.cart?.products?.map((item, index)=>
              <ul  key={index} className='ul-map-purchase'>
                <li className='list-map-purchase'>
                  <span className='h4-details-purchase'>
                    <h4>{item?.title}</h4>
                    <h4>{item?.updatedAt}</h4>
                    <h4>${item?.price}</h4>
                  </span>
                </li>
              </ul>)
            }
            
            </li>

          </ul>)
        }
    </div>
  );
};

export default Purchases;