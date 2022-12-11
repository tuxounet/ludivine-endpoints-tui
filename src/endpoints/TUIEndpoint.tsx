import { bases, endpoints, logging } from "@ludivine/runtime";
import { render } from "ink";
import TUIRouter from "./components/TUIRouter";
import { TUIBackend } from "./TUIBackend";

export class TUIEndpoint
  extends bases.KernelElement
  implements endpoints.IEndpoint
{
  constructor(readonly endpoints: endpoints.IEndpointsBroker) {
    super("tui", endpoints.kernel, endpoints);
  }

  @logging.logMethod()
  async open(): Promise<void> {
    const backend = new TUIBackend(this);
    await backend.initialize();
    const uiInstance = render(<TUIRouter backend={backend} />);
    await uiInstance.waitUntilExit();
    await backend.shutdown();
  }

  @logging.logMethod()
  async close(): Promise<void> {}
}
