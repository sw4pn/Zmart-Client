import sorter from "./sorter";

export const connectError = (code: string) => {
  return (
    code === "ERR_NETWORK" ||
    code === "ECONNABORTED" ||
    code === "ECONNREFUSED" ||
    code === "ECONNRESET" ||
    code === "EHOSTUNREACH" ||
    code === "ENETDOWN" ||
    code === "ENETUNREACH" ||
    code === "ETIMEDOUT"
  );
};

export const truncateTitle = (str: string, n = 50) => {
  return str?.length > n ? str.slice(0, n - 1) + "..." : str;
};

export function stripHTML(myString: string) {
  return myString.replace(/(<([^>]+)>)/gi, "");
}

export const sortArray = (array: Array<any>, sort: string) => {
  let sortedArr = [];
  switch (sort) {
    case "featured":
      sortedArr = sorter.numZ(array, "rating");
      break;
    case "best":
      sortedArr = sorter.numZ(array, "sold");
      break;
    case "alpha-az":
      sortedArr = sorter.alphaA(array, "title");
      break;
    case "alpha-za":
      sortedArr = sorter.alphaZ(array, "title");
      break;
    case "price-lh":
      sortedArr = sorter.numA(array, "price");
      break;
    case "price-hl":
      sortedArr = sorter.numZ(array, "price");
      break;
    case "date-new":
      sortedArr = sorter.dateA(array, "price");
      break;
    case "date-old":
      sortedArr = sorter.dateZ(array, "price");
      break;
    default:
      sortedArr = sorter.numZ(array, "sold");
      break;
  }

  return sortedArr;
};
