import { useState } from 'react';
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'


export function LoginPage(){

    const [isLogginPage, setIsLogginPage] = useState(true);
    
    const handleScreenChange = () => {
        setIsLogginPage(!isLogginPage);
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
