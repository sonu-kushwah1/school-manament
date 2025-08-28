"use client";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("query");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Search Results</h1>
      {query ? (
        <p>You searched for: <strong>{query}</strong></p>
      ) : (
        <p>No search term provided.</p>
      )}
      {/* 👉 Later, fetch API results here */}
    </div>
  );
}
