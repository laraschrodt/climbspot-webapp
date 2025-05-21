import axios from "axios";
import { FormDataType } from "../components/user/Profil/LeftSide/types";

// 🔼 Passe ggf. den Pfad zum FormDataType an, je nach Projektstruktur

export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const token = localStorage.getItem("token");

  const response = await axios.post("/api/profil/upload-image", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.url;
};

export const saveProfile = async (data: Omit<FormDataType, "password">): Promise<void> => {
  const token = localStorage.getItem("token");

  await axios.put("/api/profil", data, {
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
    "/api/user/password",
    { oldPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
