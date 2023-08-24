import { Button, Title } from '@mantine/core';
import { useState } from 'react';
import { PageOne } from './PageOne';
import { PageTwo } from './PageTwo';
import { PageThree } from './PageThree';
import { PageFour } from './PageFour';
import { PageFive } from './PageFive';

import './index.css';



export function AddProductForm() {


    const [page, setPage] = useState(3);


    const PageRendered = () => {
        switch(page){
            case 0:
                return <PageOne/>;
            case 1:
                return <PageTwo/>
            case 2:
                return <PageThree/>;
            case 3:
                return <PageFour/>;
            case 4:
                return <PageFive/>;
            default:
                return <PageOne/>
        }
    };

    function handleSubmit(){
        // Submit Form
        if(page === 4){

        }
        // Next Page
        else {
            setPage(page+1);
        }
    }


    return (
        <div className='card-addProduct'>
            
            {<PageRendered/>}

            <div className='bottomSection'>
                {/* Next or submit button */}
                <Button color='violet' onClick={handleSubmit}>
                    { page < 4 ? 'Next' : 'Submit'}
                </Button>
                {/* Back Button */}
                {
                    page > 0 && <Button color='red' onClick={()=>setPage(page-1)}>Back</Button>
                }
                
            </div>
        </div>
    );
}