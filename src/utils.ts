export const backendUrl: string = import.meta.env.BACKEND_URL || "http://localhost:5000";

console.log("Backend URL: ", backendUrl);

export const authUrl:string = `${backendUrl}/api/auth`;
export const registerUrl:string = `${backendUrl}/api/auth/register`;
export const loginUrl:string = `${backendUrl}/api/auth/login`;
export const diagnosesUrl: string = `${backendUrl}/api/diagnoses`;
export const whitelistUrl: string = `${backendUrl}/api/whitelists`;
export const requestsUrl: string = `${backendUrl}/api/requests`;

export const patientNavbarPages = [
	{
		name: "Welcome",
		route: "/",
	},
	{
		name: "Diagnoses",
		route: "/diagnoses",
	},
	{
		name: "Whitelist",
		route: "/whitelist",
	},
	{
		name: "Requests",
		route: "/requests",
	},
	{
		name: "Sign Out",
		route: "/login",
		onClickHandler: () => {
			console.log("Signing out");
			localStorage.removeItem("token");
			sessionStorage.removeItem("token");
		},
	},
];

export const medicNavbarPages = [
	{
		name: "Welcome",
		route: "/",
	},
	{
		name: "Patients",
		route: "/patients",
	},
	{
		name: "Requests",
		route: "/requests",
	},
	{
		name: "Sign Out",
		route: "/login",
		onClickHandler: () => {
			console.log("Signing out");
			localStorage.removeItem("token");
			sessionStorage.removeItem("token");
		},
	},
];