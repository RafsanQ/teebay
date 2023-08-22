import { TextInput, Button, PasswordInput, Grid  } from '@mantine/core';
import { useForm } from '@mantine/form';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { CREATE_NEW_USER } from '../../graphql/Auth.js';
;

export function SignUpForm(props){
    const navigate = useNavigate();

    const [registerUser, { error, data, loading }] = useMutation(CREATE_NEW_USER, {
        onCompleted(data, error){
            if(error){
                console.log("Registration failed. ");
                toast("Registration failed. ", {
                    style: {
                        backgroundColro: 'red',
                        color: 'white'
                    }
                });
            }
            if(data){
                toast('Registration successful', {
                    style: {
                        backgroundColor: 'green',
                        color: 'white'
                    }
                });
                props.handleScreenChange()
            }
        }
    });


    async function handleRegistration(values){
        values.name = values.firstName + ' ' + values.lastName;
        delete values.firstName;
        delete values.lastName;
        console.log( {values} );
        await registerUser({
            variables: {
                name: values.name,
                address: values.address,
                email: values.email,
                phoneNumber: values.phoneNumber,
                password: values.password,
            }
        })
    }


    if(error){
        console.log("Sign up failed.");
        toast("Sign up failed.", {
            style: {
                backgroundColor: 'red',
                color: 'white'
            }
        });
    }

    if(data){
        toast('Sign up successful', {
            style: {
                backgroundColor: 'green',
                color: 'white'
            }
        });
    }

    

    // // Need notification here
    // // if(loading){
    // //      <h2>Signing In</h2>
    // // }


    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
        },
        validate: {
            firstName: (value) => (value.length > 0 ? null : 'Please enter a valid first name'),
            lastName: (value) => (value.length > 0 ? null : 'Please enter a valid last name'),
            address: (value) => (value.length > 0 ? null : 'Please enter a valid address'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length > 0 ? null : 'Please enter a password'),
            phoneNumber: (value) => (value.length > 0 ? null : 'Please enter a valid phone number'),
            confirmPassword:  (value, values) => (value !== values.password ? 'Passwords did not match' : null)
        },
    });

    return (
        <div>
            <h1 className='pageTitle'>Sign Up</h1>
            <div className='card-form'>
                <form form onSubmit={form.onSubmit((values) => handleRegistration(values))}>
                    <Grid gutter={20}>
                        <Grid.Col span={6}>
                            <TextInput variant="unstyled" className='inputText'
                                placeholder="First Name"
                                {...form.getInputProps('firstName')}
                            />
                        </Grid.Col>
                            
                        <Grid.Col span={6}>
                            <TextInput variant="unstyled" className='inputText'
                                placeholder="Last Name"
                                {...form.getInputProps('lastName')}
                            />
                        </Grid.Col>
                    </Grid>
                    <br />
                    <TextInput variant="unstyled" className='inputText '
                        placeholder="Address"
                        {...form.getInputProps('address')}
                    />
                    <br />
                    <TextInput variant="unstyled" className='inputText'
                        placeholder="Email"
                        {...form.getInputProps('email')}
                    />
                    <br />
                    <TextInput variant="unstyled" className='inputText'
                        placeholder="Phone Number"
                        {...form.getInputProps('phoneNumber')}
                    />
                    <br />
                    <PasswordInput variant="unstyled" className='inputText'
                        placeholder="Password"
                        {...form.getInputProps('password')}
                    />
                    <br />
                    <PasswordInput variant="unstyled" className='inputText'
                        placeholder="Confirm Password"
                        {...form.getInputProps('confirmPassword')}
                    />
                    <br />
                    <Button type="submit" color="violet">Register</Button>
                </form>
                <p>Already have an account? <span onClick={props.handleScreenChange} className='changerButton'> Sign in </span></p>
            </div>
            <Toaster/>
        </div>   
    )
}
