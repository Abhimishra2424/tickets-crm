import React, { useEffect, useState } from "react";
import TicketCard from "../components/TicketCard";
import axios from "axios";

const DashBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const response = await axios.get("http://localhost:5000/tickets");
      const dataObject = response.data.data;
      const arrayOfKeys = Object.keys(dataObject);
      const arrayOfData = Object.keys(dataObject).map((key) => dataObject[key]);
      let formattedArray = [];
      arrayOfKeys.forEach((key, index) => {
        const formmatedData = { ...arrayOfData[index] };
        formmatedData["documentId"] = key;
        formattedArray.push(formmatedData);
      });
      setTickets(formattedArray);
      setLoading(false);
    }
    fetchData();
  }, []);

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "2rem",
        }}
      >
        Loading...
      </div>
    );
  } else {
    return (
      <div className="dashboard">
        <h1>My Projects</h1>
        <div className="ticket-container">
          {tickets &&
            uniqueCategories?.map((uniqueCategory, categoryIndex) => (
              <div key={categoryIndex}>
                <h3>{uniqueCategory}</h3>
                {tickets
                  .filter((t) => t.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      color={filteredTicket.color}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    );
  }
};

export default DashBoard;
