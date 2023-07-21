import { chartService } from "../../../Services/ChartService";
import aboutPhoto from "../../../Assets/Images/about_photo.png";
import "./About.css";

function About(): JSX.Element {
    console.log("About called");

    chartService.cleanUp();
    
    return (
        <div className="About">
            <div className="AboutPhoto">
                <img src={aboutPhoto} />
            </div>
            <div className="TextContainer">
            Hi there! I'm Dave, and I'm thrilled to share my journey in the Full Stack WEB course with you.<span className="MainText"><br/><br/> For my school project, I created a captivating website focused on crypto currencies, and I couldn't be prouder of the outcome. Designing the site was a true labor of love, and I poured my heart into every detail to ensure it looks impressive. <br/><br />Throughout this project, I encountered numerous challenges, but I embraced each obstacle as an opportunity to grow and learn. With perseverance and determination, I overcame every hurdle, and the result is a website that I'm genuinely proud of. <br/><br/>Building this site has been a remarkable experience, and it has fueled my passion for web development even further. I can't wait to continue exploring and expanding my skills in this exciting field!</span>
            </div>
        </div>
    );
}

export default About;
