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

import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

export default function Event() {

    const events = useLoaderData();
    return (
        <>
            <EventsList events={events} />
        </>
    )
}
