import { useState } from 'react';
import { PageOne } from './PageOne';
import { PageTwo } from './PageTwo';
import { PageThree } from './PageThree';
import { PageFour } from './PageFour';
import { PageFive } from './PageFive';

import './index.css';



export function AddProductForm() {


    // For keeping track of form data
    const [formData, setFormData] = useState({
        title: '',
        descrition: '',
        categories: [],
        price: 0,
        rentPrice: 0,
        rentDuration: ''
    });

    function handleSubmit(){
        
    }

    const [page, setPage] = useState(0);
    const PageRendered = () => {
        switch(page){
            case 0:
                return <PageOne formData={formData} setFormData={setFormData} page={page} setPage={setPage} />;
            case 1:
                return <PageTwo formData={formData} setFormData={setFormData} page={page} setPage={setPage} />
            case 2:
                return <PageThree formData={formData} setFormData={setFormData} page={page} setPage={setPage} />;
            case 3:
                return <PageFour formData={formData} setFormData={setFormData} page={page} setPage={setPage} />;
            case 4:
                return <PageFive formData={formData} setFormData={setFormData} page={page} setPage={setPage} handleSubmit={handleSubmit}/>;
            default:
                return <PageOne formData={formData} setFormData={setFormData} page={page} setPage={setPage} handleSubmit={handleSubmit}/>
        }
    };

    return (
        <div className='card-addProduct'>
            
            {<PageRendered/>}

        </div>
    );
}