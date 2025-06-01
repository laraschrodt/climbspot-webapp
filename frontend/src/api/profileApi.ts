import axios from "axios";
import { FormDataType } from "../components/user/Profile/LeftSide/types";

class ProfileApi {
  static async uploadProfileImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    const response = await axios.post("/api/profile/upload-image", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.url;
  }

  static async saveProfile(data: Omit<FormDataType, "password">): Promise<void> {
    const token = localStorage.getItem("token");

    await axios.put("/api/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async updatePassword(oldPassword: string, newPassword: string): Promise<void> {
    const token = localStorage.getItem("token");

    await axios.put(
      "/api/profile/password",
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  static async fetchUserProfile(): Promise<FormDataType> {
    const token = localStorage.getItem("token");

    const response = await axios.get("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

export default ProfileApi;
