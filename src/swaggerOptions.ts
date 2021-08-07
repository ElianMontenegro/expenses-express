export const option = {
	definition: {
	openapi: "3.0.0",
	info: {
		title: 'Expenses api',
		version: '1.0.0',
		description: "in this api you can register with a username and email, also you can login with google or facebook,you will can anote expenses,this app use json web token, where it will expire in five minutes, and with the refresh token you will can get more access tokens for keep your session active,if you want you can revoke the refresh token",
        contact: {
            name: "Elian Montenegro",
            email: "elianmontenegro491@gmail.com", 
			github: "https://github.com/ElianMontenegro"
        },
	},
	servers: [{
		url: "https://expenses-express.herokuapp.com/",
		description: "production"
	},
	{
		url: "http://localhost:5000/",
		description: "local"
	}]	
	},
	apis: ["./src/docs/*.ts"]
}
