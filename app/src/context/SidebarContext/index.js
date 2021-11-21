import { useCycle } from "framer-motion";
import { createContext } from "react";

export const SidebarContext = createContext({ variant: "initial"});

export const SidebarProvider = ({children}) => {
    
    const [variant, toggle] = useCycle("initial","expanded");

    return(
        <SidebarContext.Provider
            value = {{
                variant,
                toggle
            }}
        >
            {children}
        </SidebarContext.Provider>
    );

};