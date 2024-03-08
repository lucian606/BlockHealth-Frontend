import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }: any) {
	const { isAuthenticatd } = useAuth();
	return isAuthenticatd() ? children : <Navigate to="/login" />;
}
