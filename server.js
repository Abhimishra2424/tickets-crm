const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

// URL for database
const This_is_url_for_make_collection =
  process.env.This_is_url_for_make_collection;

//   creating a new ticket URl
const CREATE_TICKET = process.env.CREATE_TICKET;

const token = process.env.ASTRA_TOKEN;

app.post("/tickets", async (req, res) => {
  const formData = req.body.formData;

  const options = {
    method: "POST",
    headers: {
      Accpet: "application/json",
      "X-Cassandra-Token": token,
      "Content-Type": "application/json",
    },
    data: formData,
  };

  try {
    const response = await axios(CREATE_TICKET, options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
