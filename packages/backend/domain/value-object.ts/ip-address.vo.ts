import { z } from "zod";

const errorMessage: string = "不正なip addressです。";

export const IpAddressSchema = z.object({
  ip_address: z.string().ip(errorMessage),
});
export type IpAddress = z.infer<typeof IpAddressSchema>;