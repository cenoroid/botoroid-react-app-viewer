import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import socket from "./socketMiddleware";
import http from "./httpMiddleWare";

export default function store() {
  return configureStore({
    reducer,
    middleware: [socket, http],
  });
}
