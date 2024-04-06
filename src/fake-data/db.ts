import { RegisterValues } from "@/actions/register";

export const users: RegisterValues[] = [
  {
    email: "frankz@email.com",
    password: "12345678"
  }
]

export const getUserByEmail = async (email: string) => {
  return users.find((user) => user.email === email);
}
