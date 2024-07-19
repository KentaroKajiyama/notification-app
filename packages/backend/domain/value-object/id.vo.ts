import { z, ZodType, ZodTypeDef } from "zod";
import { uuidv7 } from "uuidv7";

const errorMessage = "未入力または不正なidです。";

const UuidSchema = z.string().uuid(errorMessage).brand("id");

export function createId<T extends ZodType<any, ZodTypeDef, any>>(
  schema: T, fromStringId?: string,
): z.infer<T> {
  const id = fromStringId ?? uuidv7();
  return schema.parse(id);
}

export const PatientIdSchema = UuidSchema.brand<"patient">();
export type PatientId = z.infer<typeof PatientIdSchema>;

export const createPatientId = (fromStringId?: string): PatientId =>
  createId(PatientIdSchema, fromStringId);

export const HospitalIdSchema = UuidSchema.brand<"hospital">();
export type HospitalId = z.infer<typeof HospitalIdSchema>;

export const createHospitalId = (fromStringId?: string): HospitalId =>
  createId(HospitalIdSchema, fromStringId);

