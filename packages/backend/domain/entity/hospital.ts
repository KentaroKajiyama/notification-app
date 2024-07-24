import { HospitalId,createHospitalId } from "../value-object/id.vo.ts";
import { IpAddress, parseIpAddress } from "../value-object/ip-address.vo.ts";
import { Port, parsePort } from "../value-object/port.vo.ts";

export class HospitalEntity{
  private readonly _id: HospitalId;
  private _name: string;
  private _ip_address: IpAddress;
  private _port: Port;
  
  constructor(id: string, name: string, ip_address: string, port: string) {
    this._id = createHospitalId(id);
    this._name = name;
    this._ip_address = parseIpAddress(ip_address);
    this._port = parsePort(port);
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