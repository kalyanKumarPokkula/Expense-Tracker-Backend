import transport from "../config/emailConfig";

const sendEmail = async (email: string, otp: string) => {
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

    const mailResponse = await transport.sendMail(mailOptions);
    console.log(mailResponse);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default sendEmail;
