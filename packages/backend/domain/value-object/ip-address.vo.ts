import { z } from "zod";

const errorMessage: string = "不正なip addressです。";

export const IpAddressSchema = z.string().ip(errorMessage).brand("ip_address");
export type IpAddress = z.infer<typeof IpAddressSchema>;

export const parseIpAddress = (ipAddressString: string): IpAddress => IpAddressSchema.parse(ipAddressString);