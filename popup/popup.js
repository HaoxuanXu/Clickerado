var interval; // Global variable


function deliverMessage(message) {

	let params = {
		active: true,
		currentWindow: true
	}
	chrome.tabs.query(params, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, message)
	})
}


// Listen in on response from content.js
chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
	if (message.consoleMessage != undefined) {
		document.querySelector("#submit-button").disabled = true;
		let displayText = message.consoleMessage;
		document.querySelector("#status-message").style.visibility = "visible";
		document.querySelector("#status-message").innerText = displayText;
	}
})



const submit_button = document.querySelector("#submit-button");

submit_button.addEventListener("click", () => {
	document.querySelector("#notification").innerText = "Mouse clicking job is currently running";
	document.querySelector("#notification").style.visibility = "visible";
	document.querySelector("#notification").classList.remove("alert-warning", "alert-dismissible", "fade", "show");
	document.querySelector("#notification").classList.add("alert-success");
	// let timeClicked = 0;
	let minutes = document.querySelector("#minutes").value;
	let seconds = document.querySelector("#seconds").value;
	console.log(seconds);
	let milliseconds = (minutes * 60 + seconds) * 1000;
	document.querySelector("#submit-button").disabled = true;
	document.querySelector("#stop-button").disabled = false;
	document.querySelector("#status-message").style.visibility = "visible";
	document.querySelector("#status-message").innerText = "";

	deliverMessage({time: milliseconds, clear: false})
	

	// interval = setInterval(() => {
	// 	timeClicked += 1;
	// 	let message = `Mouse clicked ${timeClicked} times`;
	// 	document.querySelector("#status-message").innerText = message;
	// 	console.log(message)
	// }, milliseconds)
});




document.querySelector("#stop-button").addEventListener("click", () => {
	document.querySelector("#notification").innerText = "Job stopped";
	document.querySelector("#notification").classList.add("alert-warning", "alert-dismissible", "fade", "show");
	document.querySelector("#notification").classList.remove("alert-success");
	clearInterval(interval);
	document.querySelector("#submit-button").disabled = false;
	// document.querySelector("#stop-button").disabled = true;
	document.querySelector("#status-message").style.visibility = "hidden";
	deliverMessage({clear: true})
})

