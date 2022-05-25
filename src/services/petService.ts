import { Configuration, PetApiFactory } from "./petClient"
import useToken from "@/composable/auth/useToken"

const getApiPetInstance = async () => {
  
  const { getAccessToken } = useToken()
  const response = await getAccessToken()
  
  const config = new Configuration({
    accessToken: response.accessToken
  });

  // TOOD: una vez instalada la api client, crear esta var en los .env: 
  // import.meta.env.VITE_API_BASE_URL y pasarlo como segundo argumento
  return PetApiFactory(config); 
}

export default {
  async findPetsByStatus(status: Array<'available' | 'pending' | 'sold'>) {
    const apiPet = await getApiPetInstance()
    return apiPet.findPetsByStatus(status);
  },
  async getPetById(id: number) {
    const apiPet = await getApiPetInstance()
    return apiPet.getPetById(id);
  },
};
