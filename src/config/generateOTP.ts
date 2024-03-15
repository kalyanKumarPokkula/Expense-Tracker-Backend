export default function generateOTP() {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * digits.length);
    OTP += digits[index];
  }
  return OTP;
}
