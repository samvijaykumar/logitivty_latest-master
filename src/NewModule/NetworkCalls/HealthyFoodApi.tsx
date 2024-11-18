import { Alert } from "react-native";
import ApiManager from "../ApiManager/ApiManager";
import Endpoints from "../ApiManager/Endpoints";

class HealthyFoodApi {
  static shared = new HealthyFoodApi();
  async getFoodCategory(): Promise<ApiResponse> {
    try {
      const response = await ApiManager.shared.get({
        url: Endpoints.getFoodDiary,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getCuisineType(): Promise<ApiResponse> {
    try {
      const response = await ApiManager.shared.get({
        url: Endpoints.getCuisineType,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getFoodList(params?: {
    food_categoty?: string;
    ciusine_type_id?: number;
    search?: string;
  }): Promise<ApiResponse> {
    try {
      const response = await ApiManager.shared.post({
        url: Endpoints.getFoodList,
        body: {
          ciusine_type_id: params?.ciusine_type_id,
          food_category:
            params?.food_categoty == "All" ? "" : params?.food_categoty,
          dish_name: params?.search ?? "",
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async addFoodToBokkmark(params?: { foodId?: number }): Promise<ApiResponse> {
    try {
      const response = await ApiManager.shared.post({
        url: Endpoints.bookmarkFood,
        body: {
          food_id: params?.foodId,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getBookmark(): Promise<ApiResponse> {
    try {
      const response = await ApiManager.shared.get({
        url: Endpoints.getBookmarkFoodList,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
export default HealthyFoodApi;
