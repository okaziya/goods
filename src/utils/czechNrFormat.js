export default function czechNrFormat(num) {
  return num.toLocaleString("cs", {
    style: "currency",
    currency: "CZK",
  });
}
