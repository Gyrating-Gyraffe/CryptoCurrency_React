import Main from "../Main/Main";
import "./Layout.css";

function Layout(): JSX.Element {
    console.log("Layout called");
    return (
        <div className="Layout">
			<header>HEADER</header>
            <aside>ASIDE L</aside>
            <main>
                <Main />
            </main> 
            <aside>ASIDE R</aside>
            <footer>FOOTER</footer>
        </div>
    );
}

export default Layout;
