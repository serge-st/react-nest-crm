import * as bcrypt from 'bcrypt';

const passwordHasher = async (saltRounds: number, password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export default passwordHasher;