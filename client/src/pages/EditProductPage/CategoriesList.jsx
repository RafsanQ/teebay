import { useState } from 'react';
import { useQuery } from "@apollo/client";
import Select from 'react-select';
import { GET_ALL_PRODUCT_CATEGORIES, GET_THIS_PRODUCTS_CATEGORIES } from '../../graphql/Products';

export function CategoriesList({productId, updateCategories}) {

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

    const [currentCategories, setCurrentCategories] = useState(null);
    const {error: queryError, loading: queryLoading } = useQuery(GET_THIS_PRODUCTS_CATEGORIES, {
        variables: {
            productId: parseInt(productId)
        },
        onCompleted( data ){
            let CategoriesListToStore = [];
            data.getSingleProduct.categories.forEach( category => {
                CategoriesListToStore.push({
                    value: category.id,
                    label: category.title
                })
            })
            setCurrentCategories(CategoriesListToStore);
        }
    })

    if(queryErrorAll || queryError){
        console.log({queryError});
        return (
            <div>
                Error Loading Categories
            </div>
        )
    }

    if(queryLoadingAll || queryLoading){
        return (
            <div>
                Loading Categories
            </div>
        )
    }

    async function handleCategoryChange(value){
        
        // const previousCategories = currentCategories;
        setCurrentCategories(value);
        
        console.log({value, currentCategories});

        updateCategories(value);
        
    }


    return (
        <div className='categories'>
            {/* <MultiSelect
            data={allCategories}
            label="Categories"
            value={currentCategories}
            onNewOptionClick={(value)=>handleCategoryChange(value)}
            /> */}
            <h4>Categories</h4>
             <Select
                defaultValue={currentCategories}
                isMulti
                isClearable={false}
                isSearchable={false}
                options={allCategories}
                onChange={handleCategoryChange}
            />

        </div>
    );
}