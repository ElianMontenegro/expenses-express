"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuctionHelpers = void 0;
class FuctionHelpers {
    isEmail(email) {
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (!(emailRegex.test(email))) {
            return false;
        }
        return true;
    }
    getToken(req, res) {
        const refreshToken = req.headers["authorization"];
        const token = refreshToken && refreshToken.split(" ")[1];
        if (!token || token == null) {
            return res.status(401).json({
                msg: "no token",
            });
        }
        return token;
    }
}
exports.fuctionHelpers = new FuctionHelpers();
