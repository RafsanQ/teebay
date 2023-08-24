import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client";
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useForm } from '@mantine/form';
import toast from 'react-hot-toast';

import { GET_SINGLE_PRODUCT } from "../../graphql/Products";

import './index.css';
import { RentForm } from "./RentForm";


export function ProdcutPage(){
    let { productid } = useParams();

    const openBuyModal = () => modals.openConfirmModal({
        title: 'Are you sure you want to buy this product?',
        centered: false,
        children: (
          <Text size="lg">
            Price: ${price}
          </Text>
        ),
        labels: { confirm: 'Buy', cancel: 'Cancel' },
        confirmProps: { color: 'violet' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => handleBuy(),
    });

    const openRentModal = () => modals.open({
        title: 'Pick the time period',
        children: (
          <RentForm/>
        ),
      });

    const {data: productData, error: queryError, loading: queryLoading } = useQuery(GET_SINGLE_PRODUCT, {
        variables: {
            productId: parseInt(productid)
        },
    })


    if(queryError) {
        console.log({ queryError });
        return (
            <div className="card-viewProduct">
                <h2>There was an Error</h2>
            </div>
        );
    }

    if(queryLoading) {
        return (
            <div className="card-viewProduct">
                <h2>Loading Product...</h2>
            </div>
        );
    }

    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }

    console.log(productData.getSingleProduct);
    const title = productData.getSingleProduct.title;
    
    const description = productData.getSingleProduct.description;
    const price = productData.getSingleProduct.price;
    const rentPrice = productData.getSingleProduct.rentPrice;
    const rentDuration = productData.getSingleProduct.rentDuration;
    const datePosted = parseISOString(productData.getSingleProduct.created_at).toString().substring(0,15);

    let categories = productData.getSingleProduct.categories || [];
    let hasCategories = false;
    if(categories.length > 0){
        hasCategories = true;
        let tempCategories = [];
        categories.forEach(category => {
            tempCategories.push(category.title);
        });
        categories = tempCategories.join(', ');
    }


    async function handleBuy(){
        console.log('Buying');

        toast(title + " Bought");
    }

    return (
        <div className="card-viewProduct">
            <h2>{title}</h2>
            {
                hasCategories && 
                (
                    <p className="categories">Categories: {categories}</p>
                )
            }

            <p className="price">Price: ${price} | ${rentPrice} per {rentDuration}</p>
            
            <p className="description">{description}</p>

            <p className="date">Posted on {datePosted}</p>
            <div className="bottomSection">
                <Button color="violet" onClick={openBuyModal}>
                    Buy
                </Button>
                <Button color="violet" onClick={openRentModal}>
                    Rent
                </Button>
            </div>
        </div>
    );
}