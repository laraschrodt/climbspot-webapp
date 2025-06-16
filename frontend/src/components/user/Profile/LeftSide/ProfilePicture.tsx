import React from "react";
import { Camera } from "react-feather";

interface Props {
  imageUrl: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePicture: React.FC<Props> = ({ imageUrl, onImageChange }) => (
  <div className="relative w-32 h-32 flex items-center justify-center">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt="Profilbild"
        className="w-32 h-32 rounded-full border-2 border-black object-cover"
      />
    ) : (
      <div className="w-32 h-32 rounded-full border-2 border-black bg-white flex items-center justify-center text-lg text-black">
        Profilbild
      </div>
    )}
    <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full border cursor-pointer">
      <Camera size={16} />
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onImageChange}
      />
    </label>
  </div>
);

export default ProfilePicture;
