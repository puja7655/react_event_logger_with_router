import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
//import {MainNavigation} from '../components/MainNavigation'

export default function RootOutlet(){
    return (
        <>
       <MainNavigation/>
        <Outlet/>
        </>
        
    )
}