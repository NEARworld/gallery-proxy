import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
import cors from "cors";
import * as config from "./config.js";

const app = express();

const unsplash = createApi({
  accessKey: config.accessKey,
  fetch: nodeFetch as typeof fetch,
});
app.use(cors());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  unsplash.photos
    .getRandom({
      count: 10,
    })
    .then((response: any) => {
      res.json(response.response);
    })
    .catch((err: object) => console.log(err));
  console.log("get request to /");
});

app.listen(8080, () => {
  console.log("Server listening on port: 8080");
});
