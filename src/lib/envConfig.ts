export const envConfig = {
  nodeEnv: process.env.NODE_ENV,
  url: process.env.NEXT_PUBLIC_API_URL as string,
  mongodbUri: process.env.MONGODB_URI as string,
  saltRounds: process.env.SALT_ROUNDS as unknown as number,

  emailUser: process.env.EMAIL_USER as string,
  emailPass: process.env.EMAIL_PASS as string,
};
