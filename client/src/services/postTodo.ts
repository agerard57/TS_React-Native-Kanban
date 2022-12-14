import { api } from "../config";
import { FormTypes } from "../types";

const url = `${api.url}/todos`;

export const postTodo = async (values: FormTypes["values"]) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    });
    return await response.json();
  } catch (error) {
    return [];
  }
};
