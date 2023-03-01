export default process.env as unknown as {
  PORT: number;
  CLOUDINARY_KEY: string;
  CLOUDINARY_KEY_SECRET: string;
  CLOUD_NAME: string;
  JWT_SECRET_KEY: string;
};
