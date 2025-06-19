import React, { useEffect, useState } from "react";
import { Edit2, Trash2, Check, X } from "lucide-react";

interface User {
  id: string;
  email: string;
  vorname: string;
  nachname: string;
  stadt: string;
  benutzername: string;
}

/**
 * Lädt Nutzer per HTTP-Request vom AdminController (über den AdminService)
 * und zeigt sie in einer editierbaren Tabelle.
 * Inline-Edits (PATCH) und Löschvorgänge (DELETE) werden
 * direkt an den AdminController geschickt, der die DB-Operationen
 * via AdminService in Supabase ausführt.
 */
const UserAdministration: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<User>>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    fetch("/api/admin/users", { headers })
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Starte den Bearbeitungsmodus für einen Nutzer und fülle die Eingabefelder.
   * @param user - Der anzupassende Nutzer
   */
  const handleStartEdits = (user: User) => {
    setEditingId(user.id);
    setEditValues({
      email: user.email,
      vorname: user.vorname,
      nachname: user.nachname,
      stadt: user.stadt || "",
      benutzername: user.benutzername || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  /**
   * Speichere die bearbeiteten Nutzerdaten per PATCH-Request und aktualisiere den State.
   * @param userId - ID des zu aktualisierenden Nutzers
   */
  const handleSaveEdits = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(editValues),
      });
      if (!res.ok) throw new Error("Update fehlgeschlagen");

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? ({ ...u, ...editValues } as User) : u
        )
      );
      cancelEdit();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Lösche einen Nutzer nach Bestätigung und aktualisiere die Tabelle.
   * @param userId - ID des zu löschenden Nutzers
   */
  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Möchtest du diesen Benutzer wirklich löschen?"))
      return;
    try {
      const token = localStorage.getItem("token");
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
      await fetch(`/api/admin/users/${userId}`, { method: "DELETE", headers });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <section className="container mx-auto max-w-5xl p-4">
      <div className="bg-white w-full max-w-4xl ml-0 my-4 p-6 rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Benutzeradministration</h2>

        {isLoading ? (
          <div className="text-center py-8">Lädt...</div>
        ) : users.length === 0 ? (
          <div className="italic text-gray-500">Keine Benutzer vorhanden.</div>
        ) : (
          <table className="table-auto w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">E-Mail</th>
                <th className="px-4 py-2 text-left">Vorname</th>
                <th className="px-4 py-2 text-left">Nachname</th>
                <th className="px-4 py-2 text-left">Stadt</th>
                <th className="px-4 py-2 text-left">Benutzername</th>
                <th className="px-4 py-2 text-left">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  {editingId === user.id ? (
                    <React.Fragment>
                      <td className="px-4 py-2">
                        <input
                          value={editValues.email || ""}
                          onChange={(e) =>
                            setEditValues((v) => ({
                              ...v,
                              email: e.target.value,
                            }))
                          }
                          className="w-full border rounded px-2 py-1"
                          placeholder="-"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          value={editValues.vorname || ""}
                          onChange={(e) =>
                            setEditValues((v) => ({
                              ...v,
                              vorname: e.target.value,
                            }))
                          }
                          className="w-full border rounded px-2 py-1"
                          placeholder="-"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          value={editValues.nachname || ""}
                          onChange={(e) =>
                            setEditValues((v) => ({
                              ...v,
                              nachname: e.target.value,
                            }))
                          }
                          className="w-full border rounded px-2 py-1"
                          placeholder="-"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          value={editValues.stadt || ""}
                          onChange={(e) =>
                            setEditValues((v) => ({
                              ...v,
                              stadt: e.target.value,
                            }))
                          }
                          className="w-full border rounded px-2 py-1"
                          placeholder="-"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          value={editValues.benutzername || ""}
                          onChange={(e) =>
                            setEditValues((v) => ({
                              ...v,
                              benutzername: e.target.value,
                            }))
                          }
                          className="w-full border rounded px-2 py-1"
                          placeholder="-"
                        />
                      </td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button
                          onClick={() => handleSaveEdits(user.id)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <td className="px-4 py-2">{user.email || "-"}</td>
                      <td className="px-4 py-2">{user.vorname || "-"}</td>
                      <td className="px-4 py-2">{user.nachname || "-"}</td>
                      <td className="px-4 py-2">{user.stadt || "-"}</td>
                      <td className="px-4 py-2">{user.benutzername || "-"}</td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button
                          onClick={() => handleStartEdits(user)}
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
                    </React.Fragment>
                  )}
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
