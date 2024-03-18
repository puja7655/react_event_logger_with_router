import EventForm from "../components/EventForm";

export default function NewEvent() {
    return (
        <>
            <EventForm method='post'/>
        </>
    )
}

//taking this action and using it in EventForm Page as i want to reuse this at multiple place with different method

// export async function action({ request, params }) {
//     const data = await request.formData();
//     const eventData = {
//         title: data.get('title'),
//         image: data.get('image'),
//         date: data.get('date'),
//         description: data.get('description')
//     }
//     const response = await fetch('http://localhost:8080/events', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(eventData)
//     })

//     if(response===422){
//         return response; //returned data from action could be used in components and pages with the help of useActionData hook.It is helpful when we want to show backend validation (error from the backend instead of standard error page.) usefull in forms
//         //here we are getting this in EventForm.js
//     }
//     if (!response.ok) {
//         throw json({ message: "Could not save event" }, { status: 500 })
//     }
//     return redirect('/events');
// }