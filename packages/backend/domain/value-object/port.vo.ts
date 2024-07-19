import { z } from "zod";

const errorMessage: string = "不正なport番号です。";

export const PortSchema = z.object({
  port: z.number().int().min(1).max(65535, errorMessage),
});

export type Port = z.infer<typeof PortSchema>;

export const parsePort = (portString: string): Port => PortSchema.parse(portString);