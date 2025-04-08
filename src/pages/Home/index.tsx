import { Link, useNavigate } from 'react-router-dom';
import { getResumeFromLocalStorage } from '@services/localstorage';

import home from '@assets/home.png';
import logol from '@assets/logolight.png';
import logod from '@assets/logo.png';

import './home.scss';

export default function Home({ darkmode }: any) {
  const { template } = getResumeFromLocalStorage();
  const continueLink = template ? `/build?template=${template}&step=basics` : '/';

  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="wrapper">
        <div className="overlay"></div>
        <div>
          <div className="logo">
            <img src={darkmode ? logol : logod} alt="Logo" />
          </div>
          <h1>Create a professional resume for free.</h1>

          {/* Button group with spacing */}
          <div className="button-group">
            <button className="primary" onClick={() => navigate('/templates')}>
              Create new resume
            </button>
            <button className="primary" onClick={() => navigate(continueLink)}>
              Continue building
            </button>
            <Link to="/budget">
              <button className="primary">Go to Budget Tracker</button>
            </Link>
          </div>
        </div>
        <img src={home} alt="Resume Preview" />
      </div>
    </div>
  );
}
