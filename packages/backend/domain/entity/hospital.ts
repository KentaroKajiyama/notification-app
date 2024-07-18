import { HospitalId } from "../value-object/id.vo.js";
import { IpAddress } from "../value-object/ip-address.vo.js";
import { Port } from "../value-object/port.vo.js";

export class HospitalEntity{
  private readonly _id: HospitalId;
  private _name: string;
  private _ip_address: IpAddress;
  private _port: Port;
  

  constructor(id: HospitalId, name: string, ip_address: IpAddress, port: Port) {
    this._id = id;
    this._name = name;
    this._ip_address = ip_address;
    this._port = port;
  }

  get getId(): HospitalId{
    return this._id;
  }

  get getName(): string {
    return this._name;
  }

  get getIpAddress(): IpAddress {
    return this._ip_address;
  }

  get getPort(): Port {
    return this._port;
  }
}