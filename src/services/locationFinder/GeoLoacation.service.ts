import axios from "axios";

export const getGeoLocationFromIP = async (ip: string): Promise<string> => {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const data = response.data;

    if (data.status === "success") {
      return `${data.city}, ${data.regionName}, ${data.country}`;
    } else {
      return "Unknown Location";
    }
  } catch (error) {
    console.error("Error getting geolocation:", error);
    return "Unknown Location";
  }
};
