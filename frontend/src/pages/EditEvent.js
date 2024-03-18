import { useRouteLoaderData } from 'react-router-dom'
import EventForm from '../components/EventForm'

export default function EditEvent() {
    const data = useRouteLoaderData('event-id'); //it works same as useLoaderData (i.e fetches teh return value of data) but it needs id;
    const event = data.event
    return (
        <>
            <EventForm method="patch" event={event} />
        </>
    )
}