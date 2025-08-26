import React from "react";
import axios from "axios";

interface Params {
  params: {
    id: string;
  };
}

const StudentDetailPage = async ({ params }: Params) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const data = res.data;
  console.log("hi");
  alert("welcome");

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Student Post Detail</h2>
      <p><strong>ID:</strong> {data.id}</p>
      <p><strong>Title:</strong> {data.title}</p>
      <p><strong>Description:</strong> {data.body}</p>
    </div>
  );
};

export default StudentDetailPage;
