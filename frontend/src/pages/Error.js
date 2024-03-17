import { useRouteError } from "react-router-dom";
import PageContent from "./PageContent";
import MainNavigation from "../components/MainNavigation";

export default function Error() {
    let error=useRouteError();
    let title="An error occured";
    let message="Something went Wrong"

    if(error.status===500){
        message=error.data.message;
    }

    if(error.status===404){
        title='Not Found'
        message="Coould not find page"
    }
    return (
        <>
        <MainNavigation/>
        <PageContent title={title}>
            <p>{message}</p>
        </PageContent>
        </>
    )
}