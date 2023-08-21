
import { Button } from '@mantine/core';

export function SignUpForm(props){
    return (
        <div>
            <h1 className='pageTitle'>Sign Up</h1>
            <div className='card'>
                <Button color="violet">Register</Button>
                <p>Dont have an account? <span onClick={props.handleScreenChange} className='changerButton'> Sign up </span></p>
            </div>
        </div>   
    )
}
