import { bases, endpoints, logging, messaging } from "@ludivine/runtime";

export class TUIBackend extends bases.KernelElement {
  constructor(readonly endpoint: endpoints.IEndpoint) {
    super("tui-backend", endpoint.kernel, endpoint);
    this.facts = [];
  }

  startTime = Date.now().toString();
  facts: messaging.IMessageEvent[];
  onNewMessage?: (fact: messaging.IMessageEvent) => void;

  @logging.logMethod()
  async initialize(): Promise<void> {
    const messages =
      this.kernel.container.get<messaging.IMessagingBroker>("messaging");
    await messages.subscribeTopic("/conversation/0", this);
  }

  @logging.logMethod()
  async shutdown(): Promise<void> {
    const messages =
      this.kernel.container.get<messaging.IMessagingBroker>("messaging");
    await messages.unsubscribeTopic("/conversation/0", this.fullName);
  }

  @logging.logMethod()
  async input(message: string): Promise<void> {
    const messages =
      this.kernel.container.get<messaging.IMessagingBroker>("messaging");
    await messages.publish("/conversation/0", {
      date: Date.now().toString(),
      input: message,
    });
  }

  @logging.logMethod()
  async onMessage(messageEvent: messaging.IMessageEvent): Promise<void> {
    this.facts.push(messageEvent);
    if (this.onNewMessage != null) {
      this.onNewMessage(messageEvent);
    }
  }
}
