// import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

async function addSongToPlaylist() {
	// TODO: implement this function
}

function isSpotifyLink(url: string) {
	if (url.includes("open.spotify.com")) return true
	return false
}
