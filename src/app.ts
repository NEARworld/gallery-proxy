import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
import * as config from "./config.js";

const app = express();

// declare global {
//   var fetch: typeof nodeFetch.default;
//   type RequestInit = nodeFetch.RequestInit;
//   type Response = nodeFetch.Response;
// }

const unsplash = createApi({
  accessKey: config.accessKey,
  fetch: nodeFetch as unknown as typeof fetch,
});

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
