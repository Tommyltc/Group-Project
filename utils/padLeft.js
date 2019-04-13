export default function padLeft(num, n) {
  return (Math.pow(10, n) + num + "").substr(1);
}
