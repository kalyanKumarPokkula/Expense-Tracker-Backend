"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailConfig_1 = __importDefault(require("../config/emailConfig"));
const sendEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: "kalyanakhil022@gmail.com",
            to: email,
            subject: "Verify your email",
            html: `
      <h1> Verify your email</h1>
      <P>${otp}</P>`,
        };
        // const mailOptions = {
        //   from: "kalyanakhil022@gmail.com",
        //   to: email,
        //   subject:
        //     emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        //   html: `<P>Click <a href="${DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        //     emailType === "VERIFY" ? "Verify your email" : "Reset your password"
        //   }</P>`,
        // };
        const mailResponse = await emailConfig_1.default.sendMail(mailOptions);
        console.log(mailResponse);
        return mailResponse;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.default = sendEmail;
