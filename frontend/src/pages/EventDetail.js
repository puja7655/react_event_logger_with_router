import { json, useRouteLoaderData } from "react-router-dom"
import EventItem from "../components/EventItem";

export default function EventDetail() {
    const data = useRouteLoaderData('event-id');
    const eventData = data.event;
    console.log("eventData",eventData)
    return (
        <>
            <EventItem event={eventData} />
        </>
    )
}

export async function loader({request, params}) {
    const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) {
        return json({ message: 'Unable to fetch Event Details' }, {
            status: 500
        })
    } else {
        return response
    }
}