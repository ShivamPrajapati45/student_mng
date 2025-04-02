import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { useDispatch, useSelector } from 'react-redux'
import { setRoles } from '@/app/store/userSlice.js';
import Form from './Form';
import { Card,CardAction,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from './ui/card';

const AuthBox = () => {
    const dispatch = useDispatch();
    

    return (
        <Tabs defaultValue="student" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2 bg-gray-400">
                <TabsTrigger onClick = {() => dispatch(setRoles('admin'))} 
                    className={'cursor-pointer '} value="admin">Admin</TabsTrigger>
                <TabsTrigger onClick = {() => dispatch(setRoles('student'))} 
                    className={'cursor-pointer'} value="student">Student</TabsTrigger>
            </TabsList>
            <TabsContent value='admin'>
                <Form/>
            </TabsContent>
            <TabsContent value='student'>
                <Form/>
            </TabsContent>
        </Tabs>
    )
}

export default AuthBox