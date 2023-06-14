import React, {useState, useEffect} from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { getData, addData, todoCollectionRef } from '../../../hooks/firebaseConfig'
import './Todo.css'
import { onSnapshot } from 'firebase/firestore'

const loader = async()=>{
    const todoList = await getData(todoCollectionRef)
    return todoList
}

const action = async ({request})=>{
    const formData = await request.formData()
    const todo = formData.get('todo')
    const written = await addData(todoCollectionRef, {todo:todo})
    return null
}

const Todo = ()=>{
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(useLoaderData())

    useEffect(()=>{
        setIsLoading(true)
        const unsub = ()=>{
            onSnapshot(todoCollectionRef, (data)=>{
                const dataArr = data.docs.map(item =>({
                    ...item.data(),
                    id:item.id
                }))
                setData(dataArr)
                setIsLoading(false)
            })
        } 
        unsub()
    },[])
    return (
        <>
            <Form method='post' replace>
                <input name='todo' type="text" placeholder="todo item" />
                <br/><br/>
                <input type="submit" value='submit' />
            </Form>
            <br/><br/>
            <section>
                <ul>
                    {data ? data.map(item=>(<li key={item.id}>{item.todo}</li>)) : <li>No items yet</li>}
                </ul>
            </section>
        </>
    )
}

export {Todo, loader, action}