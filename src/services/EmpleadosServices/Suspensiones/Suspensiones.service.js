import api from "../../../config/api.js";
import endpoints, { endpointsPost } from "../../../config/endpoints.js";

export const GetSuspensiones = async () => {
  try {
    const response = await api.get(endpoints.GET_SUSPENSIONES);
    return response.data.suspensionesLaborales;
  } catch (error) {
    throw error;
  }
};

export const ingresarSuspension = async (ingresarSuspension) => {
  try {
    const response = await api.post(
      `${endpointsPost.POST_INGRESARSUSPENSIONES}`,
      ingresarSuspension
    );
    return response.data.responseData;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
