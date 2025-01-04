export interface ITokenGenerator {
    generateToken(payload: object): string
    verifyToken(token: string): object | null // Retorna o payload decodificado ou null se inválido
}