"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Container from "@mui/material/Container";
function ApiIntegrate() {
  const [student, setStudent] = useState<any[]>([]);
  const [error, setError] = useState("");
  
  const router = useRouter();

  const getAPI = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      // const response = await axios.get("/api/student_list");
      setStudent(response.data);
    } catch (error) {
      setError("Error fetching student data");
      console.error(error);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);
  return (
    <div>
      <Container>
        <h1>1. GET All Posts (Read)</h1>
        <table className="customers">
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th colSpan={3}>Action</th>
          </tr>

          {student.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <th><button onClick={() => router.push(`/api-getdetail/${item.id}`)}>Read</button></th>
                <th><button>Delete</button></th>
                <th><button>Update</button></th>
              </tr>
            );
          })}
        </table>
      </Container>
    </div>
  );
}

export default ApiIntegrate;
