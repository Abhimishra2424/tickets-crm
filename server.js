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

const url = process.env.URL;

const token = process.env.ASTRA_TOKEN;

app.get("/tickets", async (req, res) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-Cassandra-Token": token,
    },
  };
  try {
    const response = await axios(`${url}?page-size=20`, options);
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

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
    const response = await axios(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/tickets/:documentId", async (req, res) => {
  const id = req.params.documentId;

  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "X-Cassandra-Token": token,
    },
  };

  try {
    const response = await axios(`${url}/${id}`, options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
