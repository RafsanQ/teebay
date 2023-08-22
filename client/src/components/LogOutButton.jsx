import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { isLoggedInVar } from '../cache';

export function LogOutButton(){
    const navigate = useNavigate();

    function handleLogOut(){
        toast("Signed Out");
        localStorage.setItem("token", '');
        localStorage.setItem("userId", '');
        isLoggedInVar(true);
        navigate('/');
    }

    return (
        <Button onClick={handleLogOut} className='rightSideButtons' color="red" uppercase>
            Logout
        </Button>
    )
}