import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { Group, Button } from '@mantine/core';
import { useMutation } from '@apollo/client';
import { RENT_PRODUCT } from '../../graphql/buyRentProducts';
import { GET_PRODUCTS, GET_PRODUCTS_BY_USER } from './../../graphql/Products';
import { GET_BORROWED_PRODUCTS, GET_BOUGHT_PRODUCTS, GET_LENT_PRODUCTS, GET_SOLD_PRODUCTS } from "../../graphql/buyRentProducts";
 
import toast from 'react-hot-toast';

export function RentForm({productId}) {

  const [value, setValue] = useState([null, null]);

  const [rentThisProduct] = useMutation(RENT_PRODUCT, {
    refetchQueries: [
      GET_PRODUCTS_BY_USER,
      GET_PRODUCTS, // DocumentNode object parsed with gql
      GET_BORROWED_PRODUCTS,
      GET_BOUGHT_PRODUCTS,
      GET_LENT_PRODUCTS,
      GET_PRODUCTS_BY_USER,
      GET_SOLD_PRODUCTS
    ]
  });

  async function handleRentOut() {
    const startDate = value[0];
    const endDate = value[1];
    
    const today = new Date();
    if(today > endDate){
      toast("Make sure the return date is after " + today);
      return;
    }
    

    try{
      await rentThisProduct({
        variables: {
          productId: parseInt(productId),
          userId: parseInt(localStorage.getItem('userId')),
          startDate: startDate,
          endDate: endDate
        }
      });
      window.location.replace('/products/');
      toast('Renting Successful');
    }catch(error){
      console.log({error});
      toast('There was an error')
    }
    
  }

  return (
    <div className='modal'>
      <Group position="center" className='dateForm'>
        <DatePicker type="range" value={value} onChange={setValue} />
      </Group>

      <div className='bottomSectionModal'>

        <Button color="violet" onClick={handleRentOut}>
          Rent Product
        </Button>
      </div>

    </div>
  );
}