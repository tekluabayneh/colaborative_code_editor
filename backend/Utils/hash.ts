import bcryptjs from 'bcryptjs';
import { hashSync } from 'bcryptjs';

const HashPassword = async (password: string, saltRounds: number = 10): Promise<string> => {
    const Gensalt = bcryptjs.genSaltSync(saltRounds);
    const hashedPassword = hashSync(password, Gensalt);
    return hashedPassword;
}
export default HashPassword

