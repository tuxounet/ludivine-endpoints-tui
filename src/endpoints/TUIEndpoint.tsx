import { bases, endpoints, logging } from "@ludivine/runtime";
import { render } from "ink";
import TUIRouter from "./components/TUIRouter";
import http from "http";
export class TUIEndpoint
  extends bases.KernelElement
  implements endpoints.IEndpoint
{
  constructor(readonly endpoints: endpoints.IEndpointsBroker) {
    super("tui", endpoints.kernel, endpoints);
  }

  @logging.logMethod()
  async open(): Promise<void> {
    const server = http.createServer((request, response) => {
      console.log(request);
      response.end();
    });

    server.listen(32027, () => {});

    this.log.info("rendered");
    const uiInstance = render(<TUIRouter />);
    this.log.info("rendered");
    await uiInstance.waitUntilExit();
  }

  @logging.logMethod()
  async close(): Promise<void> {}
}
