import express from "express";
import { CheckinHandler } from "../presentation/patient/handler.js";
import { ConnectionHandler } from "../presentation/hospital/handler.js";
import { ServerSentEventsHandler } from "../presentation/hospital/handler.js";
import { checkinContainer, connectionContainer, sseContainer } from "../di/inversify.config.js";
import { TYPES } from "../di/types.js";


const app = express();
const port = 3000;
const checkinHandler = checkinContainer.get<CheckinHandler>(TYPES.PatientHandler);
const connectionHandler = connectionContainer.get<ConnectionHandler>(TYPES.ConnectionHandler);
const sseHandler = sseContainer.get<ServerSentEventsHandler>(TYPES.ServerSentEventsHandler);

app.use(express.json());

app.post("/api/v1/patient/checkin", checkinHandler.execute);
app.post("/api/v1/hospital/connection", connectionHandler.execute);
app.post("/api/v1/hospital/sse",sseHandler.execute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

