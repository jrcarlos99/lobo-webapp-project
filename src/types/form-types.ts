import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormValues } from "../app/(main)/ocorrencia/new/schema";

export type FormComponentProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
};
