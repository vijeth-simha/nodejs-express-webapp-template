export default interface Error {
  errno: number;
  code: string;
  sqlState: string;
  name: string;
}
