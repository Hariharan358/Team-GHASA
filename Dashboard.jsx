import React, { useEffect, useState } from 'react';
import "../styles/Dashboard.css";
import bulb from "../assets/bulb.png";
import glass from "../assets/glass.png"; 
import horse from "../assets/horse.webp";
import jar from "../assets/jar.jpeg";
import lock from "../assets/lock.png";
import congress from "../assets/congress.png";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaVoteYea } from 'react-icons/fa';
import ResultPage from "./ResultPage";


const Dashboard = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  // Dummy data to display in the table
  const dummyCandidates = [
    {
      logo: bulb,
      name: "John",
      party: "PPP",
      description: "Party A is focused on economic growth and sustainable development."
    },
    {
      logo: glass,
      name: "Ram",
      party: "MMP",
      description: "Party B is dedicated to healthcare reform and education."
    },
    {
      logo: horse,
      name: "sam",
      party: "kku",
      description: "Party C aims to improve environmental protection and renewable energy."
    },
    {
      logo: jar,
      name: "iman",
      party: "lOE",
      description: "Party D focuses on social justice and equal opportunity for all."
    },
    {
      logo: lock,
      name: "lokesh",
      party: "NkK",
      description: "Party D focuses on social justice and equal opportunity for all."
    }
  
  ];

  const fetchLuckyNumber = async () => {
    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await axios.get("http://localhost:3000/api/v1/dashboard", axiosConfig);
      setData({ msg: response.data.msg, luckyNumber: response.data.secret });
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchLuckyNumber();
    if (token === "") {
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token]);

  return (
    <div className='dashboard-main'>
      <h2 className='first'> <span className='sec'>Secured </span><span className='tt'>Voting</span> <span className='third'> System!</span></h2>
    
      <table className='candidates-table'>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Party</th>
            <th>Description</th>
            <th>Vote</th>
          </tr>
        </thead>

        <tbody>
          {dummyCandidates.map((candidate, index) => (
            <tr key={index}>
              <td><img src={candidate.logo} alt={candidate.name} className="candidate-logo" /></td>
              <td>{candidate.name}</td>
              <td>{candidate.party}</td>
              <td>{candidate.description}</td>
              <td><button className="vote-button"><FaVoteYea /> Vote</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/logout" className="logout-button">Logout</Link> <br />
      <Link to="/ResultPage" className="Result-button">Result</Link>
    </div>
  )
}

export default Dashboard;
