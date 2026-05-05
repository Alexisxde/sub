import axios from "axios"

export default axios.create({
	baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
	timeout: 5000,
	headers: { "Content-Type": "application/json" }
})
