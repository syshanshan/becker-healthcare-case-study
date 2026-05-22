import express from "express";
import assetsRouter from "./routes/assets";
import signupsRouter from "./routes/signups";

const app = express();

app.use(express.json());

app.use("/assets", assetsRouter);
app.use("/signups", signupsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (res.headersSent) {
      return;
    }
    console.error(err);
    const message =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ error: message });
  }
);

export default app;
