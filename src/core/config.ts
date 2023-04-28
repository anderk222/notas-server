import { config } from 'dotenv';

config();

const APP = {
    PORT : process.env.PORT ||  4444,
    SECRET : process.env.JWT_KEY || 'ANDER'
}

export { APP };