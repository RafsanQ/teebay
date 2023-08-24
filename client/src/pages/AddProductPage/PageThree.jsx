import { useState } from "react";
import { useQuery } from "@apollo/client";
import Select from "react-select";
import { GET_ALL_PRODUCT_CATEGORIES } from "../../graphql/Products";
import { Title, Button } from "@mantine/core";

export function PageThree({
    formData,
    setFormData,
    page,
    setPage,
}) {
    const [allCategories, setAllCategories] = useState([]);
    const [currentCatagories, setCurrentCatagories] = useState(formData.categories);

    const { error: queryErrorAll, loading: queryLoadingAll } = useQuery(
        GET_ALL_PRODUCT_CATEGORIES,
        {
            onCompleted(data) {
                let CategoriesListToStore = [];
                data.getAllProductCategories.forEach((category) => {
                    CategoriesListToStore.push({
                        value: category.id,
                        label: category.title,
                    });
                });
                setAllCategories(CategoriesListToStore);
            },
        }
    );

    if (queryErrorAll) {
        console.log({ queryErrorAll });
        return <div>Error Loading Categories</div>;
    }

    if (queryLoadingAll) {
        return <div>Loading Categories</div>;
    }

    function handleCategoryUpdate(value){
        setCurrentCatagories(value);
        console.log(currentCatagories);
    }

    async function handleNextPage() {
        setFormData({
            ...formData,
            categories: currentCatagories
        })
        setPage(page + 1);
    }

    return (
        <div className="page">
            <Title
                sx={{
                    textAlign: "center",
                }}
                order={2}
            >
                Select Categories
            </Title>
            <br />
            <div className="categories">
                <Select
                    isMulti
                    isClearable={false}
                    isSearchable={false}
                    options={allCategories}
                    value={currentCatagories}
                    onChange={handleCategoryUpdate}
                />
            </div>
            <br />
            <div className="bottomSection">
                {/* Next or submit button */}
                <Button color="violet" onClick={handleNextPage}>
                    Next
                </Button>
                {/* Back Button */}
                <Button color="red" onClick={() => setPage(page - 1)}>
                    Back
                </Button>
            </div>
        </div>
    );
}
