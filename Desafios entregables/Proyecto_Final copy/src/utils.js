import bcrypt from 'bcrypt';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
export default __dirname

