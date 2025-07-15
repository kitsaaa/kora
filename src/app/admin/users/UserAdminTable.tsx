"use client";
import { useState } from "react";

type User = { id: string; name?: string | null; email: string; role: string; lastLogin?: string };

export default function UserAdminTable({ users, currentUserId }: { users: User[]; currentUserId: string }) {
  const [userList, setUserList] = useState(users);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", password: "", role: "user" });

  async function promoteToAdmin(id: string) {
    setError("");
    const res = await fetch(`/api/admin/users/${id}/promote`, { method: "POST" });
    if (res.ok) {
      setUserList(list => list.map(u => u.id === id ? { ...u, role: "admin" } : u));
      setSuccess("User promoted to admin");
    } else {
      setError("Failed to promote user");
    }
  }

  async function deleteUser(id: string) {
    if (!confirm("Delete this user?")) return;
    setError("");
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      setUserList(list => list.filter(u => u.id !== id));
      setSuccess("User deleted");
    } else {
      setError("Failed to delete user");
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setCreating(true);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    setCreating(false);
    if (res.ok) {
      setUserList(list => [data.user, ...list]);
      setSuccess("User created");
      setNewUser({ email: "", password: "", role: "user" });
    } else {
      setError(data.error || "Failed to create user");
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
      <form onSubmit={handleCreate} className="flex gap-2 mb-6 items-end">
        <input type="email" placeholder="Email" className="input input-bordered" value={newUser.email} onChange={e => setNewUser(u => ({ ...u, email: e.target.value }))} required />
        <input type="password" placeholder="Password" className="input input-bordered" value={newUser.password} onChange={e => setNewUser(u => ({ ...u, password: e.target.value }))} required />
        <select className="input input-bordered" value={newUser.role} onChange={e => setNewUser(u => ({ ...u, role: e.target.value }))}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit" className="admin-btn" disabled={creating}>Create</button>
      </form>
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Email</th>
              <th className="py-2 text-center">Role</th>
              <th className="py-2 text-center">Last Login</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(u => (
              <tr key={u.id} className={`border-b ${u.id === currentUserId ? "bg-zinc-100" : ""}`}>
                <td className="py-2">{u.name || <span className="text-zinc-400">—</span>}</td>
                <td className="py-2">{u.email}</td>
                <td className="py-2 text-center">{u.role}</td>
                <td className="py-2 text-center">{u.lastLogin ? new Date(u.lastLogin).toLocaleString() : <span className="text-zinc-400">—</span>}</td>
                <td className="py-2 text-right flex gap-2 justify-end">
                  {u.role !== "admin" && <button className="text-blue-600 hover:underline" onClick={() => promoteToAdmin(u.id)}>Promote</button>}
                  {u.id !== currentUserId && <button className="text-red-600 hover:underline" onClick={() => deleteUser(u.id)}>Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 