import { betterAuth } from "better-auth";
import { passkey, twoFactor } from "better-auth/plugins";
import { Resend } from "resend";

export const auth = betterAuth({
  database: {
    provider: "sqlite",
    url: "./db.sqlite",
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  emailAndPassword: {
    enabled: true,
    async sendVerificationEmail(email, url, token) {
      console.log(`Sending verification email to ${email}: ${url}`);
    },
    async sendResetPassword(url, user) {
      console.log(`Sending reset password email to ${user.email}: ${url}`);
    },
  },
  socialProviders: {
    google: {
      clientId: import.meta.env.GOOGLE_CLIENT_ID || "",
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  plugins: [
    passkey(),
    twoFactor({
      otpOptions: {
        async sendOTP(user, otp) {
          console.log(`Sending OTP to ${user.email}: ${otp}`);
        },
      },
    }),
  ],
  rateLimit: {
    enabled: true,
  },
});
