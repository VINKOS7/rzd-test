import { setupWorker } from "msw/browser";
import { handlersAccountApi } from "./accountApiMock";
import { handlersPathsApiMock } from "./pathsApiMock";

export const worker = setupWorker(...handlersAccountApi
    .concat(handlersPathsApiMock)
)