import { useState } from 'react';
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'

import './login.css'


export function LoginPage(){

    const [isLogginPage, setIsLogginPage] = useState(true);
    
    const handleScreenChange = () => {
        setIsLogginPage(!isLogginPage);
        console.log(isLogginPage);
    }

    if(isLogginPage){
        return (
            <div>
                <SignInForm handleScreenChange={handleScreenChange} />
            </div>
        )
    }
    else{
        return (
            <div>
                <SignUpForm handleScreenChange={handleScreenChange} />
            </div>   
        )
    }
    
}
