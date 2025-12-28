import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Task Management App</h1>
        <p className="home-description">
          Organize your work, track your progress, and boost your productivity
          with our simple and elegant task management application.
        </p>
        <div className="home-actions">
          {isAuthenticated ? (
            <Link to="/tasks" className="home-btn primary">
              Go to Tasks
            </Link>
          ) : (
            <>
              <Link to="/register" className="home-btn primary">
                Get Started
              </Link>
              <Link to="/login" className="home-btn secondary">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
