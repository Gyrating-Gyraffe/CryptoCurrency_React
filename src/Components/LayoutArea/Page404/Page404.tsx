import "./Page404.css";
import catImage from "../../../Assets/Images/404cat.gif";

function Page404(): JSX.Element {
    return (
        <div className="Page404">
            <div className="TextOnCat">4  &nbsp; 4</div>
            <img src={catImage} />	
        </div>
    );
}

export default Page404;
