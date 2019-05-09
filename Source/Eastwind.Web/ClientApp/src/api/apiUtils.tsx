export async function handleResponse(response: any) {
  if (response.status === 200) {
    return response.data;
  }
  if (response.status === 400) {
    const error = await response.data;
    throw new Error(error);
  }
  throw new Error("Network response error.");
}

export async function handleError(error: any) {
  console.error("API call failed. " + error);
  throw error;
}
