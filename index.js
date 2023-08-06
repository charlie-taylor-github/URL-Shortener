import express from "express";
import session from "express-session"
import mongoose from "mongoose";
import dotenv from "dotenv";
import addRoutes from "./routes.js";
import UserService from "./database/services/UserService.js";
import WebSocketHandler from "./WebSocketHandler.js";

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const port = Number(process.env.PORT);
const sessionKey = process.env.SESSION_KEY;
const saltRounds = Number(process.env.SALT_ROUNDS);
const wsPort = Number(process.env.WS_PORT);
const dbName = process.env.DB_NAME;
const atlasUsername = process.env.ATLAS_USERNAME;
const atlasPassword = process.env.ATLAS_PASSWORD;
const atlasClusterAddress = process.env.ATLAS_CLUSTER_ADDRESS;

const app = express();
const sessionConfig = {secret: sessionKey, resave: false, saveUninitialized: true};
const webSocketHandler = new WebSocketHandler(wsPort);
const dbURI = `mongodb+srv://${atlasUsername}:${atlasPassword}@${atlasClusterAddress}/${dbName}`;

mongoose.connect(dbURI);
UserService.setSaltRounds(saltRounds);

app.use(session(sessionConfig));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

addRoutes(app, webSocketHandler);

app.listen(port, () => {
    console.log(`server running... port ${port}`);
});
