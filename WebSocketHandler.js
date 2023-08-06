import { WebSocketServer } from "ws";

class WebSocketHandler {
    constructor(port) {
        this.wss = new WebSocketServer({ port: port });
        this.url = `ws://localhost:${port}`;
        this.port = port;
    }

    updateClientClickCount(clickCount, shortURL) {
        for (const client of this.wss.clients) {
            const data = {
                clickCount: clickCount,
                shortURL: shortURL
            };
            client.send(JSON.stringify(data));
        }
    }
}

export default WebSocketHandler;
