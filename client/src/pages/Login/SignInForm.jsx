import { TextInput, Button, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';


export function SignInForm(props){

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
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
