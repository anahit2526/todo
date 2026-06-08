import { Link } from 'react-router-dom';

import './Sidebar.css';

const Sidebar = () => {

    return (
        <aside className="sidebar">
            <Link className="sidebar-link" to="/todo">
                Todo
            </Link>
            <Link className="sidebar-link" to="/posts">
                Posts
            </Link>
            <Link className="sidebar-link" to="/users">
                Users
            </Link>
        </aside>
    );
};

export default Sidebar;