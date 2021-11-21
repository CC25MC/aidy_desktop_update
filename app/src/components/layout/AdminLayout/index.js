import { Fragment } from "react";
import { Content } from "../Content";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";

export const AdminLayout = ({children}) => {
    return(
        <Fragment>
            <Navbar/>
            <Sidebar/>
            <Content> 
                {children}
            </Content>
        </Fragment>
    );
};