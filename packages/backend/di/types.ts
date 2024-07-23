const TYPES = {
  // checkin時用
  PatientHandler: Symbol.for("PatientHandler"),
  ISearchPatientUseCase: Symbol.for("ISearchPatientUseCase"),
  IPatientRepository: Symbol.for("IPatientRepository"),
  // connect時
  ConnectionHandler: Symbol.for("ConnectionHandler"),
  IAddConnectionUseCase: Symbol.for("IADDConnetionUseCase"),
  IRemoveConnectionUseCase: Symbol.for("IRemoveConnectionUseCase"),
  IConnectionManagerRepository: Symbol.for("IConnectionManagerRepository"),
  // SSE時
  ServerSentEventsHandler: Symbol.for("ServerSentEventsHandler"),
  ISearchHospitalUseCase: Symbol.for("ISearchHospitalUseCase"),
  IServerSentEventsUseCase: Symbol.for("IServerSentEventsUseCase"),
  IHospitalRepository: Symbol.for("IHospitalRepository"),
  // database操作時
  AddPatientHandler: Symbol.for("AddPatientHandler"),
  IAddPatientUseCase: Symbol.for("IAddPatientUseCase"),
  RemovePatientHandler: Symbol.for("RemovePatientHandler"),
  IRemovePatientUseCase: Symbol.for("IRemovePatientUseCase"),
  AddHospitalHandler: Symbol.for("AddHospitalHandler"),
  IAddHospitalUseCase: Symbol.for("IAddHospitalUseCase"),
  RemoveHospitalHandler: Symbol.for("RemoveHospitalHandler"),
  IRemoveHospitalUseCase: Symbol.for("IRemoveHospitalUseCase"),
}

export{ TYPES }