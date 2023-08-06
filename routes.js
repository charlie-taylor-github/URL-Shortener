import URLService from "./database/services/URLService.js";
import UserService from "./database/services/UserService.js";

const authenticateUserSession = (req, user) => {
    req.session.authenticated = true;
    req.session.userId = user.id;
    return true;
}

const deauthenticateUserSession = async (req) => {
    await req.session.destroy();
    return true;
}

const ensureAuthenticated = (req, res, next) => {
    if (req.session.authenticated) {
        return next();
    }
    res.redirect("/");
}

const addRoutes = (app, webSocketHandler) => {
    app.get("/", async (req, res) => {
        await deauthenticateUserSession(req);
        res.render("home");
    });

    app.get("/account", ensureAuthenticated, async (req, res) => {
        const userID = req.session.userId;
        const urlMaps = await UserService.getURLMapsWithUserID(userID);
        const websocketURL = webSocketHandler.url;
        res.render("account", {urlMaps, userID, websocketURL});
    });

    app.get("/l/:shortURL", async (req, res) => {
        if (req.query.initial === 'true') return res.redirect("/");
        const shortURL = req.params.shortURL;
        const originalURL = await URLService.getOriginalURL(shortURL);
        if (!originalURL) return res.redirect("/");
        const urlMap = await URLService.incrementClickCount(shortURL);
        const newClickCount = urlMap.clickCount;
        webSocketHandler.updateClientClickCount(newClickCount, shortURL);
        res.redirect(originalURL);
    });

    app.post("/url/add", async (req, res) => {
        const { originalURL, shortURL, userID } = req.body;
        await URLService.createCustomURLMap(
            userID,
            originalURL,
            shortURL
        );
        res.redirect("/account");
    });

    app.post("/url/delete", async (req, res) => {
        const { urlMapID } = req.body;
        URLService.deleteURLMap(urlMapID);
        res.redirect("/account")
    });

    app.post("/signup", async (req, res) => {
        const { username, password } = req.body;
        const user = await UserService.createUser(
            username, 
            password
        );
        if (!user) return res.redirect("/");
        authenticateUserSession(req, user);
        res.redirect("/account");
    });

    app.post("/login", async (req, res) => {
        const { username, password } = req.body;
        const validUser = await UserService.getValidUser(username, password);
        if (validUser) {
            authenticateUserSession(req, validUser);
            return res.redirect("/account");
        }
        res.redirect("/");
    });

    app.post("/logout", async (req, res) => {
        await deauthenticateUserSession(req);
        res.redirect("/");
    });
}

export default addRoutes;
