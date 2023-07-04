import Nav from "../../NavArea/Nav/Nav";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    console.log("Layout called");
    return (
        <div className="Layout">
			<header><Nav /></header>
            <aside>ASIDE L</aside>
            <main>
                <Routing />
            </main> 
            <aside>ASIDE R</aside>
            <footer>FOOTER</footer>
        </div>
    );
}

export default Layout;
