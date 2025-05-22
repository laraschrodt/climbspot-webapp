import axios from "axios";
import { FormDataType } from "../components/user/Profile/LeftSide/types";

//class profileAPI {}

export const uploadProfileImage = async (file: File): Promise<string> => {
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
};

export const saveProfile = async (data: Omit<FormDataType, "password">): Promise<void> => {
  const token = localStorage.getItem("token");

  await axios.put("/api/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<void> => {
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
};
