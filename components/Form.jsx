import React, { useState } from 'react'
import { Card,CardAction,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from './ui/card';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { setIsLoggedIn, setRoles } from '@/app/store/userSlice';


const Form = () => {
    const {role} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const [data, setData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(false);

    const onValueChange = (e) => {
        setError(false);
        setData({
            ...data,
            [e.target.name]: e.target.value 
        })
    }

    const submit = (e) => {
        e.preventDefault();

        if(data.password == '' || data.username == ''){
            toast.error('All Fields are required')
            setError(true)
            return;
        }
        if(role == 'admin' && data.password == 'admin' && data.username == 'admin'){
            toast.success('Logged As Admin');
            dispatch(setRoles('admin'));
            dispatch(setIsLoggedIn(true))
            setData({   
                username: '',
                password: ''
            })
            router.push('/home');
            return;
        }else if(role == 'student' && data.password == 'student' && data.username == 'student'){
            toast.success('Logged As Student');
            dispatch(setRoles('student'));
            dispatch(setIsLoggedIn(true))
            setData({
                username: '',
                password: ''
            });
            router.push('/home');
            return;
        }else{
            setError(true);
            toast.error('Invalid Credentials!!');
            return;
        }
    }
    
    return (
        <form onSubmit={submit}>
            <Card className={''}>
            <CardHeader>
                <CardTitle>{role == 'admin' ? 'Login As Admin' : 'Login As Student'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 flex flex-col">
                <div className="space-y-1 flex flex-col gap-1">
                    <label htmlFor="name">Username</label>
                    <input 
                        value={data.username} 
                        onChange={onValueChange} 
                        name='username' 
                        id="name" 
                        className={`${error && 'border-red-400'} border-2 py-1 px-2 border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none`} />
                </div>
                <div className="space-y-1 flex flex-col gap-1">
                    <label htmlFor="username">Password</label>
                    <input value={data.password} onChange={onValueChange} name='password' id="username" 
                    className={` ${error && 'border-red-400'} border-2 py-1 px-2 border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none`} />
                </div>
            </CardContent>
            <CardFooter>
                <button className='bg-blue-500 cursor-pointer hover:bg-blue-400 px-3 py-1 rounded-md text-white'>Login</button>
            </CardFooter>
            </Card>
        </form>

    )
}

export default Form