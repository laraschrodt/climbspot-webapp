import React from "react";

interface Props {
  oldPassword: string;
  newPassword: string;
  setOldPassword: (val: string) => void;
  setNewPassword: (val: string) => void;
  changePassword: () => void;
}

const ChangePassword: React.FC<Props> = ({
  oldPassword,
  newPassword,
  setOldPassword,
  setNewPassword,
  changePassword,
}) => (
  <section className="bg-white p-6 rounded-xl shadow w-full mt-6">
    <h2 className="text-xl font-semibold mb-4">Passwort ändern</h2>
    <div className="space-y-4 text-sm text-gray-700">
      <div>
        <label className="block font-medium">Altes Passwort</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Neues Passwort</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        />
      </div>
      <button
        onClick={changePassword}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Passwort ändern
      </button>
    </div>
  </section>
);

export default ChangePassword;
