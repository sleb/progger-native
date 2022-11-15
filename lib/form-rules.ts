import { ValidationRule } from "react-hook-form";

export const required: ValidationRule<boolean> = {
  value: true,
  message: "required",
};
