import { TextInput, Button, PasswordInput, Grid  } from '@mantine/core';
import { useForm } from '@mantine/form';
;

export function SignUpForm(props){
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
                <form form onSubmit={form.onSubmit((values) => console.log(values))}>
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
        </div>   
    )
}
