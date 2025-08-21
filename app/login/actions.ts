"use server";

export async function handleForm(prevState: any, formData: FormData) {
  console.log(formData.get("email"), formData.get("password"));
  
  console.log(prevState);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  return {
    errors: ["wrong password", "password too short"],
  }
}