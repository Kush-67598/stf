import connectDb from "../../middleware/mongoose";
import user from "../../models/user";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method === "POST") {  
        try {
            let u = await user.findOne({ "email": req.body.email });

           
            if (!u) {
                return res.status(400).json({ error: "User not found" });
            }

            const decryptedPass = CryptoJS.AES.decrypt(u.password, process.env.DECRYPTION_KEY).toString(CryptoJS.enc.Utf8);

            if (req.body.email === u.email && req.body.password === decryptedPass) {
                
                var token = jwt.sign({ email: u.email, name: u.name,admin:u.admin},process.env.JWT_KEY);
                
                
                return res.status(200).json({ success: true, token, email: u.email, name: u.name,admin:u.admin});
            } else {
                return res.status(400).json({ error: "Invalid Credentials" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Server error" });
        }
    } else {
        return res.status(400).json({ error: "Method not allowed" });
    }
}

export default connectDb(handler);
