import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import socket from "./socketMiddleware";

export default function store() {
  return configureStore({
    reducer,
    middleware: [socket],
  });
}
