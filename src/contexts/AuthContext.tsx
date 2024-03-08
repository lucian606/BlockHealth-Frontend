import React, { createContext, useContext, useState } from "react";

interface User {
	id: string;
	email: string;
	name: string;
	role: "medic" | "patient";
}

interface Medic extends User {
	role: "medic";
	licenseNumber: string;
	speciality: string;
}

interface Patient extends User {
	role: "patient";
}

interface AuthContextData {
	user: User | null;
	isAuthenticatd: () => boolean;
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(() => {
		console.log("Initializing user");
		let jwt = localStorage.getItem("token");
		if (jwt) {
			console.log("Found token in local storage");
			const user: User = JSON.parse(atob(jwt.split(".")[1]));
			return user;
		}
		jwt = sessionStorage.getItem("token");
		if (jwt) {
			console.log("Found token in session storage");
			const user: User = JSON.parse(atob(jwt.split(".")[1]));
			return user;
		}
		return null;
	});

	const isAuthenticatd = () => {
		console.log("Checking if authenticated");
		return user !== null ? true : false;
	};

	const signIn = (jwtToken: string) => {
		console.log("Signing in");
		console.log(jwtToken);
		sessionStorage.setItem("token", jwtToken);
		console.log(user);
	};

	const signOut = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticatd, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};
