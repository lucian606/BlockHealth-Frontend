import React, { createContext, useContext, useState } from "react";

export interface User {
	id: string;
	email: string;
	name: string;
	jwt: string | null;
	role: "medic" | "patient";
}

export interface Medic extends User {
	role: "medic";
	licenseNumber: string;
	specialty: string;
}

export interface Patient extends User {
	role: "patient";
}

interface AuthContextData {
	user: User | null;
	isAuthenticatd: () => boolean;
	isMedic: () => boolean;
	signIn: (jwtToken: string) => void;
	signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
	return useContext(AuthContext);
};

interface AuthProviderProps {
	children: React.ReactNode;
}

function parseUserJWT(jwt: string) {
	const userJson = JSON.parse(atob(jwt.split(".")[1]));
	const role = userJson.role;
	if (role === "patient") {
		const user: Patient = {
			id: userJson.user_id,
			email: userJson.email,
			name: userJson.name,
			jwt: jwt,
			role: userJson.role,
		};
		user.jwt = jwt;
		return user;
	} else if (role === "medic") {
		const user: Medic = {
			id: userJson.user_id,
			email: userJson.email,
			name: userJson.name,
			jwt: jwt,
			role: userJson.role,
			licenseNumber: userJson.licenseNumber,
			specialty: userJson.specialty,
		};
		user.jwt = jwt;
		return user;
	}
	return null;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(() => {
		let jwt = localStorage.getItem("token");
		if (jwt) {
			console.log("Found token in local storage");
			return parseUserJWT(jwt);
		}
		jwt = sessionStorage.getItem("token");
		if (jwt) {
			console.log("Found token in session storage");
			return parseUserJWT(jwt);
		}
		return null;
	});

	const isAuthenticatd = () => {
		return user !== null ? true : false;
	};

	const isMedic = () => {
		return user?.role === "medic" ? true : false;
	};

	const signIn = (jwtToken: string) => {
		sessionStorage.setItem("token", jwtToken);
	};

	const signOut = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticatd, isMedic, signIn, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
};
