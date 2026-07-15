import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  DATABASE_URL: string | undefined;
  JWT_SECRET: string | undefined;
}

const config: Config = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET ,
  PORT: Number(process.env.PORT) || 8000,
};

export default config;
