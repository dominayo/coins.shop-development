import httpClient from "./httpClient";

export const signUp = payload => httpClient.post("/signup", payload);

export const signIn = payload => httpClient.post("/signin", payload);
