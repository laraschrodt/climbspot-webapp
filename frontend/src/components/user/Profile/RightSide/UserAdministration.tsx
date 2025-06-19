import React, { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

interface User {
  id: string;
  email: string;
  vorname: string;
  nachname: string;
}

const UserAdministration: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    fetch("/api/admin/users", { headers })
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleEdit = (userId: string) => {
    console.log("Edit user", userId);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Möchtest du diesen Benutzer wirklich löschen?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <section className="container mx-auto max-w-5xl p-4">
      <div className="bg-white w-full max-w-4xl ml-0 my-4 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Benutzeradministration</h2>

        {isLoading ? (
          <div className="text-center py-8">Lädt...</div>
        ) : users.length === 0 ? (
          <div className="italic text-gray-500">Keine Benutzer vorhanden.</div>
        ) : (
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">E-Mail</th>
                <th className="px-4 py-2 text-left">Vorname</th>
                <th className="px-4 py-2 text-left">Nachname</th>
                <th className="px-4 py-2 text-left">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.vorname}</td>
                  <td className="px-4 py-2">{user.nachname}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default UserAdministration;
