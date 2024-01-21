import express from "express";
import cors from "cors";
import axios from "axios";

const _PORT = 3000;
const app = express();
app.use(cors());

app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/photos",
    { params: { albumId } }
  );

  res.json(data);
});

app.get("/photos/:id", async (req, res) => {
  const albumId = req.query.albumId;
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
  );

  res.json(data);
});

app.listen(_PORT);
