import DashboardHeader from "./DashboardHeader";
//import DashboardStats from "./DashboardStats,jsx";
import {  useEffect } from "react";

const Dashboard = () => {
    useEffect(() => {
        document.title = "Dashboard | PowerAdmin";
    }, []);
    return (

        <div>
            {/*<PageHeader*/}
            {/*    title="Dashboard"*/}
            {/*    breadcrumbs={[*/}
            {/*        { label: "Poweradmin", href: "/poweradmin" },*/}
            {/*        { label: "Dashboard" }*/}
            {/*    ]}*/}
            {/*/>*/}
            <DashboardHeader />
           {/*<DashboardStats /> */}

           
    </div>)
        ;
};

export default Dashboard;
