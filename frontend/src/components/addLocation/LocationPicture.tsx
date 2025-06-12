import React from "react";
import { Camera } from "react-feather";
import placeholderLocation from "../../assets/images/placeholder-location.png";

interface LocationPictureProps {
  imageUrl: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LocationPicture: React.FC<LocationPictureProps> = ({
  imageUrl,
  onImageChange,
}) => (
  <div className="relative w-48 h-48">
    <img
      src={imageUrl || placeholderLocation}
      alt="Location"
      className="w-48 h-48 rounded-lg border-2 border-gray-300 object-cover"
    />
    <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full border cursor-pointer">
      <Camera size={20} />
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onImageChange}
      />
    </label>
  </div>
);

export default LocationPicture;
