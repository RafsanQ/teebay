
import { Button } from '@mantine/core';

export function SignInForm(props){
    return (
        <div>
            <h1 className='pageTitle'>Sign In</h1>
            <div className='card'>
                <Button color="violet">Login</Button>
                <p>Dont have an account? <span onClick={props.handleScreenChange} className='changerButton'> Sign up </span></p>
            </div>
        </div>   
    )
}
