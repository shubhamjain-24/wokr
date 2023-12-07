// Maintable.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import './Maintable.css';  // Import the CSS file

const Maintable = () => {
  const [userData, setUserData] = useState([]);
  const [week, setWeek] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/user/person/s@gmail.com");
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [week]);

  const updateWeek = async (weekNum) => {
    setWeek(weekNum);
    try {
      const response = await axios.post(
        `api/user/weeknum/s@gmail.com/${weekNum}`
      );
      console.log(response.data);
      // setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mainTable-container"> {/* Add a class name to the container */}
      <h2 className="Loan_tableHead">User Loans Table</h2>
      <table>
        <thead>
          <tr>
            <th>Total Amount</th>
            <th>Total Weeks</th>
            <th>Amount unpaid</th>
            <th>loan status</th>
          </tr>
        </thead>
        <tbody className="table_body" >
          {userData.map((user) => (
            <React.Fragment key={user._id}>
              <tr>
                <td>{user.TotalAmount}</td>
                <td>{user.TotalWeek}</td>
                <td>{user.TotalDifference}</td>
                <td>{user.loadPending}</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <table >
                    <thead>
                      <tr>
                        <th>Week</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.week.map((week) => (
                        <tr key={week._id}>
                          <td>{week.weekNum}</td>
                          <td>{week.Date.substring(0, 10)}</td>
                          <td>{week.amount}</td>
                          <td>{week.Status ? "Paid" : "Unpaid"}</td>
                          <td>
                            <button onClick={() => updateWeek(week.weekNum)}>
                              Want to pay
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Maintable;
