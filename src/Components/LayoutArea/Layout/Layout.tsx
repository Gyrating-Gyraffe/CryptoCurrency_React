import { logger } from "../../../Utils/Logger";
import Nav from "../../NavArea/Nav/Nav";
import Routing from "../Routing/Routing";
import { createContext, useEffect, useRef, useState } from "react";
import "./Layout.css";
import bgSlideImage from "../../../Assets/Images/minimal_home.png";
import SelectedCoinsWindow from "../../NavArea/SelectedCoinsWindow/SelectedCoinsWindow";
import SearchBar from "../../NavArea/SearchBar/SearchBar";
import SelectNotification from "../../HomeArea/SelectNotification/SelectNotification";

export const ScrollContext = createContext<number>(0);

function Layout(): JSX.Element {
    console.log("Layout called", "Component Load Sequence");

    const [scrollValue, setScrollValue] = useState<number>(0);
    const mainRef = useRef<HTMLElement | null>(null);

    // Handles passing scroll info to scroll context for infinite scroll in Home.tsx
    useEffect(() => {
        const handleScroll = () => {
            if(!mainRef.current)    return;
            // Last received scroll position in <main> element
            const lastScrollPos: number = mainRef.current.scrollTop;   
            // Infinite scroll trigger boundaries
            const scrollMargin = window.innerHeight * 1.3; // Margin in px
            const topScroll = 0 + scrollMargin * 1.5;
            const botScroll = mainRef.current.scrollHeight - scrollMargin;

            // Is 1 if we're near bottom, 0 if we're in the center, and -1 if we're near the top. Follows HTML y-axis convention
            const finalScrollValue = lastScrollPos < topScroll ? -1 : (lastScrollPos > botScroll ? 1 : 0); 

            // If we're *very* close to the top of the page we pass a large negative number. For more info see how Home.tsx handles these numbers
            if(lastScrollPos < 500) return setScrollValue(-10000);
            setScrollValue(finalScrollValue);
        };

        if (mainRef.current) {
            mainRef.current.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (mainRef.current) {
                mainRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    
    return (
        <div className="Layout">
			<aside>
                <Nav />
            </aside>
            <SelectNotification />
            <ScrollContext.Provider value={scrollValue}>
                <main ref={mainRef}>
                    <Routing />
                </main>
            </ScrollContext.Provider>
            {/* <footer>FOOTER</footer> */}
        </div>
    );
}

export default Layout;
