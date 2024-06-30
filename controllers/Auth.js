import "dotenv/config";
import JWT from "jsonwebtoken";
import { createHash, verifyHash } from "../utils/bcrypt.js";
import { pool } from "../db/database.js";
import {
  findEmail,
  getUserDetails,
  loginUser,
  findUsername,
  signUpUser,
} from "../db/commands.js";
import { transporter } from "../mail/index.js";
import { generateHTML } from "../mail/template.js";

export const postSignupController = async (req, res) => {
  const { name, lastName, username, password, email } = req.body;
  if (!name || !lastName || !username || !password || !email) {
    return res.status(200).json({ message: "INCOMPLETE FIELDS" });
  }

  try {
    let [checkUsername] = await pool.query(findUsername, [username]);
    if (checkUsername.length >= 1) {
      return res.status(200).json({ message: "Username already exits" });
    }

    let [checkEmailExits] = await pool.query(findEmail, [email]);
    if (checkEmailExits.length >= 1) {
      return res.status(200).json({ message: "Email already exits" });
    }

    let hashedPassword = createHash(password);

    let [result] = await pool.query(signUpUser, [
      name,
      lastName,
      hashedPassword,
      username,
      email,
    ]);

    let id = result.insertId;

    const mailOptions = {
      from: { name: "IT MART", address: "dilpreetsaini174@gmail.com" },
      to: email,
      subject: "IT MART",
      html: generateHTML(`${name} ${lastName}`),
    };

    transporter.sendMail(mailOptions);

    if (id) {
      let payload = {
        id: id,
        username,
      };

      const accessToken = JWT.sign(payload, process.env.JWTKEY, {
        expiresIn: "30d",
      });

      return res
        .status(200)
        .json({ message: "success", token: accessToken, payload });
    } else {
      return res.status(200).json({ message: "Something went Wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postLoginController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "BAD-REQUEST" });
  }
  try {
    const [rows] = await pool.query(loginUser, [username]);
    let passwordFromDb = rows[0].password;
    if (passwordFromDb) {
      const hashedPasswordFromDB = passwordFromDb;
      const result = await verifyHash(password, hashedPasswordFromDB);
      if (result) {
        let payload = {
          id: rows[0].id,
          username: rows[0].username,
        };
        const accessToken = JWT.sign(payload, process.env.JWTKEY, {
          expiresIn: "30d",
        });
        res.status(200).json({
          message: "success",
          token: accessToken,
          payload,
        });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(404).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const VerifyProfileController = async (req, res) => {
  const authorizationHeader = req.headers["authorization"];

  if (authorizationHeader) {
    try {
      let decode = JWT.verify(authorizationHeader, process.env.JWTKEY);
      let [rows] = await pool.query(getUserDetails, [decode.id]);
      if (rows) {
        let payload = { id: rows[0].id, username: rows[0].username };
        res.status(200).json({ payload });
      } else {
        res.status(404).json({ message: "Unauthorized" });
      }
    } catch (e) {
      res.status(404).json({ message: "Unauthorized" });
    }
  } else {
    res.status(404).json({ message: "header not found" });
  }
};
