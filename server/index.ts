import express, { json } from "express";
import cors from "cors";
import axios from "axios";
import * as redis from "redis";

const _PORT = 3000;
const DEFAULT_EXPIRATION = 120;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const redisClient = redis.createClient({
  socket: { host: "rdb", port: 6379 },
});

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;

  const cached = await redisClient.get("photos");
  debugger;
  if (cached) return res.json(JSON.parse(cached));

  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/photos",
    { params: { albumId } }
  );
  redisClient.setEx("photos", DEFAULT_EXPIRATION, JSON.stringify(data));
  res.json(data);
});

app.get("/photos/:id", async (req, res) => {
  const albumId = req.query.albumId;
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
  );

  res.json(data);
});

app.listen(_PORT, () => {
  console.log(`listening on port: ${_PORT}`);
});
