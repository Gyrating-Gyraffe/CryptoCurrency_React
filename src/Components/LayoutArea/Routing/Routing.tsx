import "./Routing.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import LiveReport from "../../LiveReportArea/LiveReport/LiveReport";
import About from "../../AboutArea/About/About";
import Page404 from "../Page404/Page404";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/live" element={<LiveReport />} />
                <Route path="/about" element={<About />} />

                <Route path="/" element={<Navigate to="/home" />} />

                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;
