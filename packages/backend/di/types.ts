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
}

export{ TYPES }