import { TextInput, Button, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { GET_AUTH } from '../../graphql/Auth.js';


export function SignInForm(props){

    const navigate = useNavigate();

    const [signInUser, { error, data, loading }] = useLazyQuery(GET_AUTH, {
        onCompleted(data, error){
            if(error){
                console.log("Sign in failed", error);
                return;
            }
            localStorage.setItem("token", data.token)
            navigate('/products')
        }
    });

    async function handleLogin(values){
        console.log(values);

        await signInUser({
            variables: {
                email: values.email,
                password: values.password
            }
        })

        if(error){
            console.log("Sign in failed. ", error.networkError.result.errors[0].message);
        }
    }   

    const form = useForm({
        initialValues: {
          email: '',
          password: ''
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length > 0 ? null : 'Please enter a password')
        },
    });

    return (
        <div>
            <h1 className='pageTitle'>Sign In</h1>
            <div className='card-form'>
                <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
                    <TextInput variant="unstyled" className='inputText'
                        withAsterisk
                        placeholder="Email"
                        {...form.getInputProps('email')}
                    />
                    <br />
                    <PasswordInput variant="unstyled" className='inputText'
                        withAsterisk
                        placeholder="Password"
                        {...form.getInputProps('password')}
                    />
                    <br />
                    <Button type="submit" color="violet">Login</Button>
                </form>
                <p>Dont have an account? <span onClick={props.handleScreenChange} className='changerButton'> Sign up </span></p>
            </div>
        </div>   
    )
}
