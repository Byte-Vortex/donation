import axios from "axios"

export const clientMakeRequest = axios.create({
  baseURL: "https://guptvrindavandham.org/api",
  withCredentials: true,
})

clientMakeRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message) {
      throw {
        message: error.response.data.message,
        status: error.response.status,
      }
    }
    throw {
      status: 500,
      message: "Internal server error",
    }
  },
)
