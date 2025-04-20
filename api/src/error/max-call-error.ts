export class MaxCallError extends Error {
  constructor(maxCall: number) {
    super(`Max ${maxCall} call reach`);
  }
}
