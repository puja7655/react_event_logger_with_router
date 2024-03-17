// import { useState, useEffect } from "react";
// import EventsList from "../components/EventsList";

// export default function Event() {
//     const [fetchedData, setFectchedData] = useState();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState();

//     useEffect(() => {
//         async function fetchData() {
//             setIsLoading(true)
//             try {
//                 const response = await fetch('http://localhost:8080/events');
//                 if (!response.ok) {
//                     throw new Error(response.message || 'unable to fetch Events')
//                 } else {
//                     const resData = await response.json();
//                     setFectchedData(resData.events)
//                 }
//             } catch (error) {
//                 setError(error || 'unable to get Data')
//             }
//             setIsLoading(false)
//         }
//         fetchData()
//     }, [])

//     return (

//         <>
//             <div style={{ textAlign: 'center' }}>
//                 {isLoading && <p>Loading...</p>}
//                 {error && <p>{error}</p>}
//             </div>
//             {!isLoading && fetchedData && <EventsList events={fetchedData} />}
//         </>
//     )
// }


//with the help of Loader

import { useLoaderData, json } from "react-router-dom";
import EventsList from "../components/EventsList";

export default function Event() {

    const data = useLoaderData();
    const events = data.events
    return (
        <>
            <EventsList events={events} />
        </>
    )
}

//Here we are creating a function and using it in app.js for loader which is being usd to fetch data in the above component.
//In this way Event.js and App.js both are laener . we are outsourcing the loader and it is present where it is being used
export async function Loader() {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        throw json(
            { message: 'Unable fetch data' },
            { status: 500 }
        )

        // throw new Error(response.message || 'unable to fetch Events') //If an error occurs it would bebble up to nearest errorElement in router hierarchy
    } else {
        // const resData = await response.json();
        //return resData.events
        return response // we can directly return response as fetch resturns a promise which resolves to a response of type Response. This is supported by browser
        //so we do not need to manually exctract the response from the received response we can directly return it
    }
}



// Loader function execution is happening on clientside i.e on browser not on server. we can use any browser api  like localstorage ,cookies etc
// but we can not use react Hooks because those hooka are only available in react components and the loaderr function is not a react component.
