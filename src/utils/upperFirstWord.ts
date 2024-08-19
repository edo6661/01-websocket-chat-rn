export default function upperFirstWord(str: string): string {
  return str.length <= 0 ? "Word is empty" : str.charAt(0).toUpperCase() + str.slice(1);
}
