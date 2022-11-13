import { endpoints, modules } from "@ludivine/runtime";
import { TUIEndpoint } from "./endpoints/TUIEndpoint";

const moduleDefinition: modules.IModuleDefinition = {
  endpoints: [
    {
      name: "tui",
      ctor: (endpoints: endpoints.IEndpointsBroker) =>
        new TUIEndpoint(endpoints),
    },
  ],
};
export default moduleDefinition;
