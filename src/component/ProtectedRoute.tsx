"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token === null) {
      router.replace("/"); // agar token nahi hai to login bhejo
    }
  }, [token, router]);

  // Jab tak token check ho raha hai tab loader dikhao
  if (token === null) {
    return <p>Checking authentication...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
