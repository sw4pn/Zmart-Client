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
