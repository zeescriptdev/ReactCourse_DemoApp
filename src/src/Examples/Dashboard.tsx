import { Link, Outlet } from "react-router-dom";


export const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <Link to="profile">Profile</Link>
                <Link to="settings">Settings</Link>
                <Link to="analytics">Analytics</Link>
            </nav>
            <Outlet /> {/* Dashboard/settings, Dashboard/profile, Dashboard/analytics */}
        </div>
    )
}

export const Profile = () => {
    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}

export const Settings = () => {
    return (
        <div>
            <h1>Settings</h1>
        </div>
    )
}

export const Analytics = () => {
    return (
        <div>
            <h1>Analytics</h1>
        </div>
    )
}
