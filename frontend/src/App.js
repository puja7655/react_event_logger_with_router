// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - Home
//    - EventsPage
//    - EventDetail
//    - NewEvent
//    - EditEvent
// 2. Add routing & route definitions for these five pages
//    - / => Home
//    - /events => EventsPage
//    - /events/<some-id> => EventDetail
//    - /events/new => NewEvent
//    - /events/<some-id>/edit => EditEvent
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetail
// 7. Output the ID of the selected event on the EventDetail
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import Event, { Loader as eventLoader } from './pages/Event';
import EventDetail, {
  loader as eventDetailLoader,
  action as eventDeleteAction
} from './pages/EventDetail';
import NewEvent, { action as newEventAction } from './pages/NewEvent';
import EditEvent from './pages/EditEvent';
import RootOutlet from './pages/root';
import Eventsroot from './pages/Eventsroot';
import Error from './pages/Error';
import { action as manipulateEventAction } from './components/EventForm'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootOutlet />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> }, //default path
        {
          path: 'events', element: <Eventsroot />, children: [
            // { index: true, element: <Event /> },//default path fro events
            {
              index: true,
              element: <Event />,
              loader: eventLoader
            },
            {
              path: ':eventId',
              id: 'event-id',
              loader: eventDetailLoader,
              children: [
                {
                  index: true,
                  element: <EventDetail />,
                  action: eventDeleteAction,
                },
                {
                  path: 'edit',
                  element: <EditEvent />,
                  action: manipulateEventAction
                }
              ]
            },
            {
              path: 'new',
              element: <NewEvent />,
              action: manipulateEventAction
            }
          ]
        }

      ]
    }
  ])
  return <div>
    <RouterProvider router={router} />
  </div>;
}

export default App;
