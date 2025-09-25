import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate("/contact")}>Contact</button>
            <h1>Home</h1>
        </div>
    )
}

export const About = () => {
    return (
        <div>
            <h1>About</h1>
        </div>
    )
}

export const Contact = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate("/about")}>About</button>
            <h1>Contact</h1>
        </div>
    )
}

export const NotFound = () => {
    return (
        <div>
            <h1>404 Page Not Found</h1>
        </div>
    )
}