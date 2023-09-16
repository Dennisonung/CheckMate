import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import "./navbar.css"

const Navbar = () => {
    return (
        <div id='navbarDiv'>
            <div id='navbar'>
                <div className="navbarItems">
                    <Link to="/" className='link'>
                        Home
                    </Link>

                </div>
                <div className="navbarItems">
                    <Link to="/billing" className='link'>
                        billing
                    </Link>

                </div>
                <div className="navbarItems">
                    <Link to="/groups" className='link'>
                        group
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
