import express from "express";
import { CheckinHandler, AddPatientHandler, RemovePatientHandler } from "../presentation/patient/handler.ts";
import { ConnectionHandler, AddHospitalHandler, RemoveHospitalHandler } from "../presentation/hospital/handler.ts";
import { ServerSentEventsHandler } from "../presentation/hospital/handler.ts";
import { checkinContainer, connectionContainer, sseContainer, dbContainer } from "../di/inversify.config.ts";
import { TYPES } from "../di/types.ts";


const app = express();
const port = 3000;
const checkinHandler = checkinContainer.get<CheckinHandler>(TYPES.PatientHandler);
const addPatientHandler = dbContainer.get<AddPatientHandler>(TYPES.AddPatientHandler);
const removePatientHandler = dbContainer.get<RemovePatientHandler>(TYPES.RemovePatientHandler);
const addHospitalHandler = dbContainer.get<AddHospitalHandler>(TYPES.AddHospitalHandler);
const removeHospitalHandler = dbContainer.get<RemoveHospitalHandler>(TYPES.RemoveHospitalHandler);
const connectionHandler = connectionContainer.get<ConnectionHandler>(TYPES.ConnectionHandler);
const sseHandler = sseContainer.get<ServerSentEventsHandler>(TYPES.ServerSentEventsHandler);

app.use(express.json());

app.post("/api/v1/patient/checkin", checkinHandler.execute);
app.post("/api/v1/patient/add", addPatientHandler.execute);
app.delete("/api/v1/patient/remove", removePatientHandler.execute);
app.post("/api/v1/hospital/add", addHospitalHandler.execute);
app.delete("/api/v1/hospital/remove", removeHospitalHandler.execute);
app.post("/api/v1/hospital/connection", connectionHandler.execute);
app.post("/api/v1/hospital/sse",sseHandler.execute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

