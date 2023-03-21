import axios from "axios"
import dotenv from "dotenv"

import { getToken } from "./auth/token"

dotenv.config()
const playlistId = process.env.SPOTIFY_PLAYLIST_ID
const apiUrl = process.env.SPOTIFY_API_BASE_URL

let token = ""

async function addSongToPlaylist(message: string) {
	// TODO: implement this function
	let res
	if (!token) res = await getToken()
	token = res.access_token
	const split = message.split("/")
	let songLink
	const songLinkIdx = split.indexOf("open.spotify.com")
	if (songLinkIdx === -1) return
	else {
		songLink = split[songLinkIdx]
		console.log("songlink var ", songLink)
		const trackId = songLink.split("/").at(-1)
		console.log("trackid var ", trackId)
		const trackInfo = await axios.get(`${apiUrl}/tracks/${trackId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
		console.log("trackinfo var ", trackInfo)
		const uri = trackInfo.data.uri
		console.log("uri var ", uri)
		if (!uri) {
			console.error(
				"Track uri not fetched successully. Debug logic in function addSongToPlaylist lines 18-32"
			)
			return
		}
		const isAdded = await axios.post(
			`${apiUrl}/playlists/${playlistId}/tracks`,
			{
				uris: [uri],
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		)
		console.log(isAdded)
	}
}

async function getTrackInfo() {}

function isSpotifyLink(url: string): Boolean {
	if (url.includes("open.spotify.com")) return true
	return false
}

const runProgram = async () => {
	console.log("Attempting to add song to playlist")
	const results = await addSongToPlaylist(
		`https://open.spotify.com/track/4LjuYGFZJrLSYFrjoAm6P1?si=45f00c99434140c3`
	)

	console.log("RESULTS OF TRYING TO ADD SONG TO PLAYLIST >>>>>>>>>>", results)
}

const initProgram = async () => {
	const resp = await getToken()
	if (resp.access_token) token = resp.access_token
	else return
}

;(async () => {
	await initProgram()
	await runProgram()
})()
