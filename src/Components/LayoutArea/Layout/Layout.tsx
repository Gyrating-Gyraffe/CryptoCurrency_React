import { logger } from "../../../Utils/Logger";
import Nav from "../../NavArea/Nav/Nav";
import Routing from "../Routing/Routing";
import { createContext, useEffect, useRef, useState } from "react";
import "./Layout.css";
import bgSlideImage from "../../../Assets/Images/minimal_home.png";
import SelectedCoinsWindow from "../../NavArea/SelectedCoinsWindow/SelectedCoinsWindow";

export const ScrollContext = createContext<number>(0);

function Layout(): JSX.Element {
    console.log("Layout called", "Component Load Sequence");

    const [scrollValue, setScrollValue] = useState<number>(0);
    const mainRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if(!mainRef.current)    return;
            const scrollMargin = 1400; // Margin in px
            const lastScrollPos: number = mainRef.current.scrollTop;
            const topScroll = 0 + scrollMargin + 600;
            const botScroll = mainRef.current.scrollHeight - scrollMargin;
            setScrollValue(lastScrollPos < topScroll ? -1 : (lastScrollPos > botScroll ? 1 : 0));
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
                <br /><br /><br /><br /><br /><br /><br />
                Library
                <input className="SearchBar"
                type="text"
                placeholder=" Search  . . ." />
                
                <SelectedCoinsWindow />
            </aside>
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
