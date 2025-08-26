"use client"; // for App Router

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "@/redux/slice/userSlice";
import type { RootState, AppDispatch } from "@/store";
import { useRouter } from 'next/navigation'; // App Router

export default function HomePage() {
const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const {
    data: users,
    loading,
    error,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Student List</h2>

      <div className="styled-table">
        <table>
          <thead>
            <tr style={{ backgroundColor: "#4CAF50", color: "white" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.fname}</td>
                <td>{user.email || "-"}</td>
                <td>{user.phone || "-"}</td>
                <td>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      onClick={() => router.push(`/read-user/${user.id}`)}
                    >
                      Read
                    </button>
                    <button
                      onClick={() => router.push(`/create-user/${user.id}`)}
                    >
                      Edit
                    </button>
                    <button onClick={() => dispatch(deleteUser(user.id))}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
