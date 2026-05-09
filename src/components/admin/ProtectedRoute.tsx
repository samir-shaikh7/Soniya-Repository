import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Static version: always authorized
  return <>{children}</>;
};
