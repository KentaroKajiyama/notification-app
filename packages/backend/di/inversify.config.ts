import "reflect-metadata";
import { Container } from "inversify";
import { IPatientRepository } from "../domain/repository/patient-repository.ts";
import { TYPES } from "./types.ts";
import { PatientRepositoryImpl } from "../infrastructure/repository/patient-repository.ts";
import { ISearchPatientUseCase, SearchPatientUseCaseImpl } from "../app/patient/search.ts";
import { IAddConnectionUseCase, AddConnectionUseCaseImpl } from "../app/hospital/add-connection.ts";
import { IRemoveConnectionUseCase, RemoveConnectionUseCaseImpl } from "../app/hospital/remove-connection.ts";
import { IConnectionManagerRepository } from "../domain/repository/connection-manager.ts";
import { ConnectionManagerRepositoryImpl } from "../infrastructure/repository/connection-manager-repository.ts";
import { IAddPatientUseCase, AddPatientUseCaseImpl } from "../app/patient/add.ts";
import { IRemovePatientUseCase, RemovePatientUseCaseImpl } from "../app/patient/remove.ts";
import { IAddHospitalUseCase, AddHospitalUseCaseImpl } from "../app/hospital/add-hospital.ts";
import { IRemoveHospitalUseCase, RemoveHospitalUseCaseImpl } from "../app/hospital/remove-hospital.ts";
import { IServerSentEventsUseCase, ServerSentEventsUseCaseImpl } from "../app/hospital/sse.ts";
import { IHospitalRepository } from "../domain/repository/hospital-repository.ts";
import { HospitalRepositoryImpl } from "../infrastructure/repository/hospital-repository.ts";
import { CheckinHandler } from "../presentation/patient/handler.ts";
import { AddPatientHandler, RemovePatientHandler } from "../presentation/patient/handler.ts";
import { AddHospitalHandler, RemoveHospitalHandler, ServerSentEventsHandler, ConnectionHandler } from "../presentation/hospital/handler.ts";
import { ISearchHospitalUseCase, SearchHospitalUseCaseImpl } from "../app/hospital/search.ts";

const checkinContainer = new Container();
// 患者がCheckin時の依存解決用のコンテナ
checkinContainer.bind<CheckinHandler>(TYPES.CheckinHandler).to(CheckinHandler);
checkinContainer.bind<ISearchPatientUseCase>(TYPES.ISearchPatientUseCase).to(SearchPatientUseCaseImpl);
checkinContainer.bind<IPatientRepository>(TYPES.IPatientRepository).to(PatientRepositoryImpl);
checkinContainer.bind<IHospitalRepository>(TYPES.IHospitalRepository).to(HospitalRepositoryImpl);
// 病院がconnectしてきた際の依存解決用のコンテナ
const connectionContainer = new Container();
connectionContainer.bind<ConnectionHandler>(TYPES.ConnectionHandler).to(ConnectionHandler)
connectionContainer.bind<IAddConnectionUseCase>(TYPES.IAddConnectionUseCase).to(AddConnectionUseCaseImpl);
connectionContainer.bind<IRemoveConnectionUseCase>(TYPES.IRemoveConnectionUseCase).to(RemoveConnectionUseCaseImpl);
connectionContainer.bind<IConnectionManagerRepository>(TYPES.IConnectionManagerRepository).to(ConnectionManagerRepositoryImpl);

// SSEの依存解決用のコンテナ
const sseContainer = new Container();
sseContainer.bind<ServerSentEventsHandler>(TYPES.ServerSentEventsHandler).to(ServerSentEventsHandler);
sseContainer.bind<ISearchHospitalUseCase>(TYPES.ISearchHospitalUseCase).to(SearchHospitalUseCaseImpl);
sseContainer.bind<IServerSentEventsUseCase>(TYPES.IServerSentEventsUseCase).to(ServerSentEventsUseCaseImpl);
sseContainer.bind<IHospitalRepository>(TYPES.IHospitalRepository).to(HospitalRepositoryImpl);

sseContainer.bind<IConnectionManagerRepository>(TYPES.IConnectionManagerRepository).to(ConnectionManagerRepositoryImpl);

// DB操作時の依存解決用のコンテナ
const dbContainer = new Container();
dbContainer.bind<AddPatientHandler>(TYPES.AddPatientHandler).to(AddPatientHandler);
dbContainer.bind<IAddPatientUseCase>(TYPES.IAddPatientUseCase).to(AddPatientUseCaseImpl);
dbContainer.bind<RemovePatientHandler>(TYPES.RemovePatientHandler).to(RemovePatientHandler);
dbContainer.bind<IRemovePatientUseCase>(TYPES.IRemovePatientUseCase).to(RemovePatientUseCaseImpl);
dbContainer.bind<AddHospitalHandler>(TYPES.AddHospitalHandler).to(AddHospitalHandler);
dbContainer.bind<IAddHospitalUseCase>(TYPES.IAddHospitalUseCase).to(AddHospitalUseCaseImpl);
dbContainer.bind<RemoveHospitalHandler>(TYPES.RemoveHospitalHandler).to(RemoveHospitalHandler);
dbContainer.bind<IRemoveHospitalUseCase>(TYPES.IRemoveHospitalUseCase).to(RemoveHospitalUseCaseImpl);
dbContainer.bind<IPatientRepository>(TYPES.IPatientRepository).to(PatientRepositoryImpl);
dbContainer.bind<IHospitalRepository>(TYPES.IHospitalRepository).to(HospitalRepositoryImpl);

export { checkinContainer, connectionContainer, sseContainer, dbContainer };