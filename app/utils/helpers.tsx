const greenCodes = [46033];
const yellowCodes = [46032];

export function checkZipCode(zipCode: number) {
  if (greenCodes.includes(zipCode)) {
    return "green";
  } else if (yellowCodes.includes(zipCode)) {
    return "yellow";
  } else {
    return "red";
  }
}
