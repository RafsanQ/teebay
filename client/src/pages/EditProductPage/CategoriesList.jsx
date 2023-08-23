import { useState } from 'react';
import { MultiSelect } from '@mantine/core';
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCT_CATEGORIES } from '../../graphql/Products';

export function CategoriesList() {

    const [allCategories, setAllCategories] = useState([]);

    const { error: queryError, loading: queryLoading } = useQuery(GET_ALL_PRODUCT_CATEGORIES, {
        onCompleted( data ){
            let CategoriesListToStore = [];
            data.getAllProductCategories.forEach( category => {
                CategoriesListToStore.push({
                    value: category.id,
                    label: category.title
                })
            })
            setAllCategories(CategoriesListToStore);
        }
    })

    if(queryError){
        return (
            <div>
                Error Loading Categories
            </div>
        )
    }

    if(queryLoading){
        return (
            <div>
                Loading Categories
            </div>
        )
    }


    return (
        <div className='categories'>
            <MultiSelect
            data={allCategories}
            label="Select your categories"
            onChange={()=>console.log(allCategories)}
            placeholder="Pick all that you like"
            />
        </div>
    );
}