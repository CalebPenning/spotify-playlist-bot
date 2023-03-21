import axios from "axios"
import dotenv from "dotenv"

import { getToken } from "./auth/token"

dotenv.config()
const playlistId = process.env.SPOTIFY_PLAYLIST_ID as string
const apiUrl = process.env.SPOTIFY_API_BASE_URL as string

let token = ""

async function addSongToPlaylist(message: string) {
	// TODO: implement this function
	const split = message.split("/")
	const trackId = split.at(-1)

	if (!trackId) return
	else {
		const trackInfo = await getTrackInfo(apiUrl, trackId, token)
		const { uri } = trackInfo

		if (!uri) {
			console.error(
				"Track uri not fetched successully. Debug logic in function addSongToPlaylist lines 18-32"
			)
			return
		}
		// const isAdded = await axios.post(
		// 	`${apiUrl}/playlists/${playlistId}/tracks`,
		// 	{
		// 		uris: [uri],
		// 	},
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 			"Content-Type": "application/json",
		// 		},
		// 	}
		// )
		// console.log(isAdded.data)
	}
}

async function getTrackInfo(
	apiUrl: string,
	trackId: string,
	bearerToken: string
) {
	const trackInfoResponse = await axios.get(`${apiUrl}/tracks/${trackId}`, {
		headers: {
			Authorization: `Bearer ${bearerToken}`,
			"Content-Type": "application/json",
		},
	})
	return trackInfoResponse.data
}

function isSpotifyLink(url: string): Boolean {
	if (url.includes("open.spotify.com")) return true
	return false
}

const runProgram = async () => {
	console.log("Attempting to add song to playlist")
	const results = await addSongToPlaylist(
		`https://open.spotify.com/track/4LjuYGFZJrLSYFrjoAm6P1?si=45f00c99434140c3`
	)

	// console.log("RESULTS OF TRYING TO ADD SONG TO PLAYLIST >>>>>>>>>>", results)
}

const initProgram = async () => {
	const { access_token } = await getToken()
	if (access_token) token = access_token
	else {
		console.log("no token retrieved")
		process.exit(1)
	}
}

;(async () => {
	await initProgram()
	await runProgram()
})()
