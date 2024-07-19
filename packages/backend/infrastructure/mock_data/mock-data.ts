import { Request, Response } from "express";

export class ConnectionMockDB{
  static data: Map<string,[Request,Response]> = new Map();

  static addData(key:string, value:[Request,Response]):void{
    this.data.set(key, value);
  }

  static removeData(key:string):void{
    this.data.delete(key);
  }

  static getData(key:string):[Request,Response] | undefined{
    return this.data.get(key);
  }

}

type PatientData ={
  id: string,
  name: string
}

export class PatientMockDB{
  static data: PatientData[] = [];

  static addData(patient: PatientData):void{
    this.data.push(patient);
  }

  static removeData(id: string):void{
    this.data = this.data.filter(p => p.id!==id);
  }

  static getData(id: string):PatientData | undefined{
    return this.data.find(p => p.id===id);
  }
}

type HospitalData ={
  id: string,
  name: string,
  ip_address: string,
  port: number
}

export class HospitalMockDB{
  static data: HospitalData[] = [];

  static addData(hospital: HospitalData):void{
    this.data.push(hospital);
  }

  static removeData(id: string):void{
    this.data = this.data.filter(h => h.id!==id);
  }

  static getData(id: string):HospitalData | undefined{
    return this.data.find(h => h.id===id);
  }
}