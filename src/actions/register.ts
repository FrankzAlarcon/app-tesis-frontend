"use server"

export interface RegisterValues {
  email: string;
  password: string;
}

export const register = async (values: RegisterValues) => {
  // const existingUser = await getUserByEmail(values.email);

  // if (existingUser) {
  //   return {
  //     error: "User already exists"
  //   }
  // }

  // users.push(values);

  // // TODO: Send verification token email

  return {
    success: "User created"
  }
}