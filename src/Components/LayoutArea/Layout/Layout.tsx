import { logger } from "../../../Utils/Logger";
import Nav from "../../NavArea/Nav/Nav";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    logger.log("Layout called", "Component Load Sequence");
    return (
        <div className="Layout">
			<header><Nav /></header>
            <aside>ASIDE L</aside>
            <main>
                <Routing />
            </main> 
            <aside>ASIDE R</aside>
            {/* <footer>FOOTER</footer> */}
        </div>
    );
}

export default Layout;
