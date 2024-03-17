import { useParams } from "react-router-dom"

export default function EventDetail(){
    const params=useParams()
    return (
        <>
        <h1>Home</h1>
        <p>{params.eventId}</p>
        </>
    )
}