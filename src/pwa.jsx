import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
	onNeedRefresh() {
		if (confirm("Une nouvelle version est disponible. Voulez-vous télécharger la dernière version ?"));
		updateSW()
	},

	onOfflineReady() {
		console.log("Application prête pour une utilisation hors-ligne")
	},
})