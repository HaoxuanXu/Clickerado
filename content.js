chrome.runtime.onMessage.addListener(gotMessage)
let intervalList = [];
function gotMessage(message, sender, sendResponse) {
	let interval;
	console.log(message.time)
	if (message.time != undefined && message.clear == false) {
		let timeClicked = 0;
		interval = setInterval(() => {
			document.querySelector("body").click()
			timeClicked += 1
			let consoleRecord = `Mouse clicked ${timeClicked} times`;
			console.log(consoleRecord)
			// Send the message back to popup.js 
			chrome.runtime.sendMessage({consoleMessage: consoleRecord})
		}, message.time);
		intervalList.push(interval);

	} else {
		for (interval of intervalList) {
			clearInterval(interval)
		}		
	}
}






