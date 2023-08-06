const webSocketURL = document.getElementById("websocketURL").dataset.url;
const socket = new WebSocket(webSocketURL);

socket.onmessage = e => {
    const data = JSON.parse(e.data);
    const clickCountText = document.querySelector(
        `h4[data-shorturl="${data.shortURL}"].click-count`
    );
    clickCountText.textContent = `${data.clickCount} clicks`;
};
