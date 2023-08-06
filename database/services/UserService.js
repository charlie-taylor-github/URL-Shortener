import UserManager from "../managers/UserManager.js"

class UserService {
    static async setSaltRounds(saltRounds) {
        UserManager.setSaltRounds(saltRounds);
    }

    static async createUser(username, password) {
        const exists = await UserManager.getUserWithUsername(username);
        if (exists) return null;
        const hashedPassword = await UserManager.getHashedPassword(password);
        const user = await UserManager.createUser(username, hashedPassword);
        return user;
    }

    static async getUserWithUsername(username) {
        const user = await UserManager.getUserWithUsername(username);
        return user;
    }

    static async getUserWithID(userID) {
        const user = await UserManager.getUserWithID(userID);
        return user;
    }

    static async getURLMapsWithUserID(userID) {
        const urlMaps = await UserManager.getURLMapsWithUserID(userID);
        return urlMaps;
    }

    static async getValidUser(username, password) {
        const user = await UserManager.getUserWithUsername(username);
        if (!user) return null;
        const correctPassword = await UserManager.getValidPassword(password, user.password);
        if (correctPassword) return user;
        return null;
    }
}

export default UserService;
