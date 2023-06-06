import React from 'react'
import { Outlet, defer, Await, useLoaderData } from 'react-router-dom'
import useFetchData from '../../hooks/useFetcher';

export function loader(){
    return defer({myData: fetch(`https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json`).then(res => res.json())})
}

export function Layout() {
    const dataPromise = useLoaderData()

    return(
        <div className='--layout-container'>
            <React.Suspense fallback={<h1>Loading vans...</h1>}>
                <Await resolve={dataPromise.myData}>
                    {myData => {
                        return(
                            <>
                            <Outlet  context={myData}/>
                            </>
                        )
                    }}     
                </Await>
            </React.Suspense> 
        </div>
    )
}
