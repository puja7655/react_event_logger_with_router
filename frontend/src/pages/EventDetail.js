import { json, redirect, useRouteLoaderData } from "react-router-dom"
import EventItem from "../components/EventItem";

export default function EventDetail() {
    const data = useRouteLoaderData('event-id');
    const eventData = data.event;
    console.log("eventData", eventData)
    return (
        <>
            <EventItem event={eventData} />
        </>
    )
}

export async function loader({ request, params }) {
    const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) {
        throw json({ message: 'Unable to fetch Event Details' }, {
            status: 500
        })
    } else {
        return response
    }
}

export async function action({ params,request }) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method // this method we are setting in handleDelete method insode submit() object received from useSubmit hook in EventItem.js
    });
    if (!response.ok) {
        throw json({ message: 'Could not delete events' }, {
            status: 500
        })
    }
    return redirect('/events')
}