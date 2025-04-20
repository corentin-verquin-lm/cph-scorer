export class PlayerUnknowException extends Error {
  constructor(id: string) {
    super(`Player ${id} unknow`);
  }
}
