import dotenv from "dotenv"
import axios from "axios"
dotenv.config()

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const authToken = Buffer.from(`${clientId}:${clientSecret}`, "utf-8").toString(
	"base64"
)

async function getToken() {
	const url = "https://accounts.spotify.com/api/token"
	try {
		const res = await axios.post(url, "grant_type=client_credentials", {
			headers: {
				Authorization: `Basic ${authToken}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		return res.data
	} catch (err) {
		console.error({ error: err })
	}
}

;(async () => {
	const token = await getToken()
	console.log("Result >>>> ", token)
})()
