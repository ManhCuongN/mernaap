export const apiURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "https://mernaap.herokuapp.com";

export const LOCAL_STORAGE_TOKEN_NAME = "learit-token";
