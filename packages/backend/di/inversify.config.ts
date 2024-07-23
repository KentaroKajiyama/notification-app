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

const checkinContainer = new Container();
// 患者がCheckin時の依存解決用のコンテナ
checkinContainer.bind<ISearchPatientUseCase>(TYPES.ISearchPatientUseCase).to(SearchPatientUseCaseImpl);
checkinContainer.bind<IPatientRepository>(TYPES.IPatientRepository).to(PatientRepositoryImpl);
checkinContainer.bind<IHospitalRepository>(TYPES.IHospitalRepository).to(HospitalRepositoryImpl);
// 病院がconnectしてきた際の依存解決用のコンテナ
const connectionContainer = new Container();
connectionContainer.bind<IAddConnectionUseCase>(TYPES.IAddConnectionUseCase).to(AddConnectionUseCaseImpl);
connectionContainer.bind<IRemoveConnectionUseCase>(TYPES.IRemoveConnectionUseCase).to(RemoveConnectionUseCaseImpl);
connectionContainer.bind<IConnectionManagerRepository>(TYPES.IConnectionManagerRepository).to(ConnectionManagerRepositoryImpl);

// SSEの依存解決用のコンテナ
const sseContainer = new Container();
connectionContainer.bind<IServerSentEventsUseCase>(TYPES.IServerSentEventsUseCase).to(ServerSentEventsUseCaseImpl);

// DB操作時の依存解決用のコンテナ
const dbContainer = new Container();
connectionContainer.bind<IAddPatientUseCase>(TYPES.IAddPatientUseCase).to(AddPatientUseCaseImpl);
connectionContainer.bind<IRemovePatientUseCase>(TYPES.IRemovePatientUseCase).to(RemovePatientUseCaseImpl);
connectionContainer.bind<IAddHospitalUseCase>(TYPES.IAddHospitalUseCase).to(AddHospitalUseCaseImpl);
connectionContainer.bind<IRemoveHospitalUseCase>(TYPES.IRemoveHospitalUseCase).to(RemoveHospitalUseCaseImpl);

export { checkinContainer, connectionContainer, sseContainer, dbContainer };