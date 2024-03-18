import { Form, useActionData, useNavigate, useNavigation,json,redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {

  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && <ul>
        {Object.values(data.errors).map(err => (
          <li key={err}>{err}</li>
        ))}
      </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'submitting..' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  }

  let url = 'http://localhost:8080/events'
  if (method === 'PATCH') {
    const eventId = params.eventId//since in route defination this 'eventId' is set for 'id'
    url = 'http://localhost:8080/events/' + eventId
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  })

  if (response === 422) {
    return response; //returned data from action could be used in components and pages with the help of useActionData hook.It is helpful when we want to show backend validation (error from the backend instead of standard error page.) usefull in forms
    //here we are getting this in EventForm.js
  }
  if (!response.ok) {
    throw json({ message: "Could not save event" }, { status: 500 })
  }
  return redirect('/events');
}
