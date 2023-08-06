import User from "../models/userModel.js";
import URLMap from "../models/urlMapModel.js";
import bcrypt from "bcrypt";

class UserManager {
    static saltRounds = 10;

    static async setSaltRounds(saltRounds) {
        this.saltRounds = saltRounds;
    }

    static async createUser(username, password) {
        try {
            const user = new User({
                username: username,
                password: password
            });
            await user.save();
            return user;

        } catch (e) { throw e }
    }

    static async getUserWithUsername(username) {
        try {
            const user = await User.findOne({username: username});
            if (user) return user;
            return null;

        } catch (e) { throw e }
    }

    static async getUserWithID(userID) {
        try {
            const user = await User.findOne({_id: userID});
            if (user) return user;
            return null;

        } catch (e) { throw e }
    }

    static async getURLMapsWithUserID(userID) {
        try {
            const urlMaps = await URLMap.find({ userID });
            return urlMaps;

        } catch (e) { throw e }
    }

    static async getHashedPassword(password) {
        const hashedPassword = await bcrypt.hash(
            password, this.saltRounds
        );
        return hashedPassword;
    }

    static async getValidPassword(passwordAttempt, hashedPassword) {
        try {
            const isMatch = await bcrypt.compare(passwordAttempt, hashedPassword);
            return isMatch;

          } catch (e) { throw e }
    }
}

export default UserManager;
