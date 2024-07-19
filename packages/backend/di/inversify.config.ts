import "reflect-metadata";
import { Container } from "inversify";
import { IPatientRepository } from "../domain/repository/patient-repository.js";
import { TYPES } from "./types.js";
import { PatientRepositoryImpl } from "../infrastructure/repository/patient-repository.js";
import { ISearchPatientUseCase, SearchPatientUseCaseImpl } from "../app/patient/search.js";
import { IAddConnectionUseCase, AddConnectionUseCaseImpl } from "../app/hospital/add-connection.js";
import { IRemoveConnectionUseCase, RemoveConnectionUseCaseImpl } from "../app/hospital/remove-connection.js";
import { IConnectionManagerRepository } from "../domain/repository/connection-manager.js";
import { ConnectionManagerRepositoryImpl } from "../infrastructure/repository/connection-manager-repository.js";


const checkinContainer = new Container();
// 患者がCheckin時の依存解決用のコンテナ
checkinContainer.bind<IPatientRepository>(TYPES.IPatientRepository).to(PatientRepositoryImpl);
checkinContainer.bind<ISearchPatientUseCase>(TYPES.ISearchPatientUseCase).to(SearchPatientUseCaseImpl);
// 病院がconnectしてきた際の依存解決用のコンテナ
const connectionContainer = new Container();
connectionContainer.bind<IAddConnectionUseCase>(TYPES.IAddConnectionUseCase).to(AddConnectionUseCaseImpl);
connectionContainer.bind<IRemoveConnectionUseCase>(TYPES.IRemoveConnectionUseCase).to(RemoveConnectionUseCaseImpl);
connectionContainer.bind<IConnectionManagerRepository>(TYPES.IConnectionManagerRepository).to(ConnectionManagerRepositoryImpl);
// SSEの依存解決用のコンテナ
const sseContainer = new Container();

export { checkinContainer, connectionContainer, sseContainer };