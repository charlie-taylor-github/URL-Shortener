import URLMap from "../models/urlMapModel.js"

class URLManager {
    static async createURLMap(userID, originalURL, shortURL) {
        try {
            const urlMap = new URLMap({
                userID: userID,
                originalURL: originalURL,
                shortURL: shortURL
            });
            await urlMap.save();
            return urlMap;

        } catch (e) { throw e }
    }

    static async getAllURLMaps() {
        try {
            const urlMaps = await URLMap.find();
            return urlMaps;

        } catch (e) { throw e }
    }

    static async getOriginalURL(shortURL) {
        try {
            const record = await URLMap.findOne({shortURL: shortURL});
            if (record) return record.originalURL;
            return null;

        } catch (e) { throw e }
    }

    static async deleteURLMap(urlMapID) {
        try {
            const result  = await URLMap.deleteOne({ _id: urlMapID});
            return result.deletedCount >= 1;

        } catch (e) { throw e }
    }

    static async addToClickCount(shortURL, value=1) {
        try {
            const urlMap = await URLMap.findOne({shortURL: shortURL});
            if (!urlMap) return null;
            urlMap.clickCount = urlMap.clickCount + value;
            await urlMap.save();
            return urlMap;

          } catch (e) { throw e }
    }
}

export default URLManager;
