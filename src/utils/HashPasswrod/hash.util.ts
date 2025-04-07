import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    const saltRound = 20020726;
    return await bcrypt.hash(password, saltRound);
}