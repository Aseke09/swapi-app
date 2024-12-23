import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';


export const Navigation = () => {
    const dispatch = useDispatch();

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container'>
            <Link className='navbar-brand' to='/'>SWAPI App</Link>
            <div className='navbar-nav'>
              <Link className='nav-link' to="/">Dashboard</Link>
              <Link className='nav-link' to="/people">Characters</Link>
              <Link className='nav-link' to='/planets'>Planets</Link>
              <Link className='nav-link' to='/starships'>Starships</Link>
              <Link className='nav-link' to='/species'>Species</Link>
              <button
                className='btn btn-outline-light ms-3'
                onClick={() => dispatch(logout())}
              >Logout</button>
            </div>
          </div>
        </nav>
    );
};