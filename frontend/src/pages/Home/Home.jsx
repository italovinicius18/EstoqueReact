import "./Home.css";

import Signin from '../../components/Signin/Signin'
import Signup from '../../components/Signup/Signup'
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
  return (
    <div className="Home">    
        <Navbar />
        <h1>Home</h1>
        <Signin/>
    </div>
  );
};

export default Home;