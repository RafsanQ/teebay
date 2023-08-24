import { useState } from 'react';
import { useQuery } from "@apollo/client";
import Select from 'react-select';
import { GET_ALL_PRODUCT_CATEGORIES } from '../../graphql/Products';
import { Title } from '@mantine/core';

export function PageThree() {
    const [allCategories, setAllCategories] = useState([]);

    const { error: queryErrorAll, loading: queryLoadingAll } = useQuery(GET_ALL_PRODUCT_CATEGORIES, {
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

    

    if(queryErrorAll){
        console.log({queryErrorAll});
        return (
            <div>
                Error Loading Categories
            </div>
        )
    }

    if(queryLoadingAll){
        return (
            <div>
                Loading Categories
            </div>
        )
    }

    async function handleCategoryChange(value){
        
        console.log({value});
        
    }

    return (
        <div className='page'>
            <Title
            sx={{
                textAlign: 'center',
            }}
            order={2}
            >
            Select Categories
            </Title>
            <br />
            <div className='categories'>
            {/* <MultiSelect
            data={allCategories}
            label="Categories"
            value={currentCategories}
            onNewOptionClick={(value)=>handleCategoryChange(value)}
            /> */}
             <Select
                isMulti
                isClearable={false}
                isSearchable={false}
                options={allCategories}
                onChange={handleCategoryChange}
                
            />

        </div>
        </div>
    );
}