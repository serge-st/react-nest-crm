declare const passwordHasher: (saltRounds: number, password: string) => Promise<string>;
export default passwordHasher;
