"use server";
import {z} from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

const checkUsername = (username:string) => !username.includes("potato");

const checkPasswords = ({ password, confirm_password } : { password: string, confirm_password: string }) => password === confirm_password;

const formSchema = z.object({
  username: z.string({
    invalid_type_error: "username must be a string",
    required_error: "username is required"
  })
  .min(3, "짧아")
  .max(10, "길어")
  .toLowerCase()
  .trim()
  .refine(checkUsername, "potato is not allowed"),
  email: z.string().email().toLowerCase(),
  password: z.string().min(10).regex(passwordRegex, "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  confirm_password: z.string().min(10),
}).refine(checkPasswords, {
  message: "passwords do not match",
  path: ["confirm_password"]
});

export async function createAccount(prevState:any, formData:FormData) {

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password")
  };


  const result = formSchema.safeParse(data);

  if(!result.success) {
    return result.error.flatten();
  }

}