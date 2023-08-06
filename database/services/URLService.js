import URLManager from "../managers/URLManager.js"

class URLService {
    static async createCustomURLMap(userID, originalURL, shortURL) {
        const exists = await URLManager.getOriginalURL(shortURL);
        if (exists) return null;
        const urlMap = await URLManager.createURLMap(
            userID, originalURL, shortURL
        );
        return urlMap;
    }

    static async getAllURLMaps() {
        const urlMaps = await URLManager.getAllURLMaps();
        return urlMaps;
    }

    static async getOriginalURL(shortURL) {
        const url = await URLManager.getOriginalURL(shortURL);
        return url;
    }

    static async deleteURLMap(urlMapID) {
        const deleted = await URLManager.deleteURLMap(urlMapID);
        return deleted;
    }

    static async incrementClickCount(shortURL) {
        const updatedURLMap = await URLManager.addToClickCount(shortURL, 1);
        return updatedURLMap;
    }
}

export default URLService;
