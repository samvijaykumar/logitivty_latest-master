import AsyncStorage from "@react-native-async-storage/async-storage";
import UserSession from "../../utils/UserSession";
import NetworkConstants from "../../network/NetworkConstant";
const defaultHeaders: Record<string, any> = {
  "Content-Type": "application/json",
  // Accept: 'application/json',
};
class ApiManager {
  static shared = new ApiManager();

  post = async (params: { url: string; body: any }) => {
    try {
      const userData = await UserSession.getUserSessionData();
      console.log("API=======================>");
      console.log(`${NetworkConstants.BASE_URL}${params.url}`);
      if (userData) {
        console.log("ACCESS TOKEN=======================>");
        console.log(userData.token);
        defaultHeaders.Authorization = `Bearer ${userData.token}`;
      }
      const response = await fetch(
        `${NetworkConstants.BASE_URL}${params.url}`,
        {
          method: "POST",
          body: JSON.stringify(params.body),
          headers: defaultHeaders,
        }
      );
      let finalResponse = await this.validateResponse(response);
      return finalResponse;
    } catch (error) {
      throw error;
    }
  };

  get = async (params: { url: string; queryParams?: any }) => {
    try {
      const userData = await UserSession.getUserSessionData();

      if (userData) {
        console.log("ACCESS TOKEN=======================>");
        console.log(userData.token);
        defaultHeaders.Authorization = `Bearer ${userData.token}`;
      }
      console.log("API=======================>");
      console.log(`${NetworkConstants.BASE_URL}${params.url}`);

      const response = await fetch(
        `${NetworkConstants.BASE_URL}${params.url}`,
        {
          method: "GET",
          headers: defaultHeaders,
        }
      );
      let finalResponse = await this.validateResponse(response);
      return finalResponse;
    } catch (error) {
      throw error;
    }
  };

  getStatus(statusCode: number): boolean {
    return statusCode >= 200 && statusCode <= 299;
  }
  async validateResponse(response: Response): Promise<ApiResponse> {
    let jsonData = await response.json();

    console.log("RESPONSE=======================>");
    this.logPrettyJson(jsonData);
    console.log("REQUEST=======================>");
    this.logPrettyJson(response.body);
    switch (response.status) {
      case 200:
      case 201:
        return {
          message: jsonData["message"],
          data: jsonData["data"],
          status: jsonData["statusCode"],
          success: this.getStatus(jsonData["statusCode"]),
        };

      default:
        return {
          message: response.statusText,
          data: null,
          status: response.status,
          success: this.getStatus(response.status),
        };
    }
  }
  logPrettyJson(data: any) {
    console.log(JSON.stringify(data, null, 2));
  }
}

export default ApiManager;
