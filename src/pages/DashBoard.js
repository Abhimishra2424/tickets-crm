import React, { useEffect } from "react";
import TicketCard from "../components/TicketCard";
import axios from "axios";

const DashBoard = () => {
  const [tickets, setTickets] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5000/tickets");

      //wasn't sure how to get the Documet Id with the object.. open to better suggestions
      const dataObject = response.data.data;

      console.log("dataObject", dataObject);

      const arrayOfKeys = Object.keys(dataObject);
      const arrayOfData = Object.keys(dataObject).map((key) => dataObject[key]);

      console.log("arrayOfKeys", arrayOfKeys);
      console.log("arrayOfData", arrayOfData);

      let formattedArray = [];

      arrayOfKeys.forEach((key, index) => {
        const formmatedData = { ...arrayOfData[index] };
        formmatedData["documentId"] = key;

        console.log("formmatedData", formmatedData);
        formattedArray.push(formmatedData);
      });

      setTickets(formattedArray);

    }
    fetchData();
  }, []);

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

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
};

export default DashBoard;
