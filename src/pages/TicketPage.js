import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TicketPage = ({ editMode }) => {
  const [tickets, setTickets] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    status: "not started",
    progress: 0,
    timestamp: new Date().toISOString(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if editmode is false, then create a new ticket
    if (!editMode) {
      const response = await axios.post("https://ticket-api-nodejs.herokuapp.com/tickets", {
        formData,
      });
      const success = response.status === 200;
      if (success) {
        navigate("/");
      }
    } else {
      // if editmode is true, then update the ticket
      const response = await axios.put(`https://ticket-api-nodejs.herokuapp.com/tickets/${id}`, {
        data: formData,
      });
      const success = response.status === 200;
      if (success) {
        navigate("/");
      }
    }
  };

  // fecth the ticket data from the server with the id from the url
  const fetchDatabyID = async () => {
    const response = await axios.get(`https://ticket-api-nodejs.herokuapp.com/tickets/${id}`);
    setFormData(response.data.data);
  };

  // if editMode is true, fetch the data from the server for the ticket with the id
  useEffect(() => {
    if (editMode) {
      fetchDatabyID();
    }
    // eslint-disable-next-line
  }, []);

  // fetch the tickets from the server and set them to the state of categorys
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://ticket-api-nodejs.herokuapp.com/tickets");
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
    }
    fetchData();
  }, []);

  // get unique categories from the tickets and set them to the state of categories
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="ticket">
      <h1>{editMode ? "update your Ticket" : "Create a Ticket"}</h1>
      <div className="ticket-container">
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              required={true}
              value={formData.title}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleChange}
              required={true}
              value={formData.description}
            />
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {uniqueCategories?.map((category, _index) => (
                <option key={_index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label htmlFor="new-category">New Category</label>
            <input
              id="new-category"
              name="category"
              type="text"
              onChange={handleChange}
              value={formData.category}
            />
            <label>Priority</label>
            <div className="multiple-input-container">
              <input
                id="priority-1"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={1}
                // eslint-disable-next-line
                checked={formData.priority == 1}
              />
              <label htmlFor="priority-1">1</label>
              <input
                id="priority-2"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={2}
                // eslint-disable-next-line
                checked={formData.priority == 2}
              />
              <label htmlFor="priority-2">2</label>
              <input
                id="priority-3"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={3}
                // eslint-disable-next-line
                checked={formData.priority == 3}
              />
              <label htmlFor="priority-3">3</label>
              <input
                id="priority-4"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={4}
                // eslint-disable-next-line
                checked={formData.priority == 4}
              />
              <label htmlFor="priority-4">4</label>
              <input
                id="priority-5"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={5}
                // eslint-disable-next-line
                checked={formData.priority == 5}
              />
              <label htmlFor="priority-5">5</label>
            </div>

            {editMode && (
              <>
                <input
                  type="range"
                  id="progress"
                  name="progress"
                  value={formData.progress}
                  min="0"
                  max="100"
                  onChange={handleChange}
                />
                <label htmlFor="progress">Progress</label>

                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option selected={formData.status === "done"} value="done">
                    Done
                  </option>
                  <option
                    selected={formData.status === "working on it"}
                    value="working on it"
                  >
                    Working on it
                  </option>
                  <option selected={formData.status === "stuck"} value="stuck">
                    Stuck
                  </option>
                  <option
                    selected={formData.status === "not started"}
                    value="not started"
                  >
                    Not Started
                  </option>
                </select>
              </>
            )}
            <input type="submit" />
          </section>

          <section>
            <label htmlFor="owner">Owner</label>
            <input
              id="owner"
              name="owner"
              type="owner"
              onChange={handleChange}
              required={true}
              value={formData.owner}
            />

            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              name="avatar"
              type="url"
              onChange={handleChange}
            />
            <div className="img-preview">
              {formData.avatar && (
                // eslint-disable-next-line
                <img src={formData.avatar} alt="image preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default TicketPage;
