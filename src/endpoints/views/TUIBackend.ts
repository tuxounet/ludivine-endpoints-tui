import {
  bases,
  endpoints,
  logging,
  messaging,
  scheduler,
} from "@ludivine/runtime";

export class TUIBackend extends bases.KernelElement {
  constructor(readonly endpoint: endpoints.IEndpoint) {
    super("tui-backend", endpoint.kernel, endpoint);
    this.messaging = this.kernel.container.get("messaging");
    this.scheduler =
      this.kernel.container.get<scheduler.ISchedulerBroker>("scheduler");
    this.events = [];
  }
  messaging: messaging.IMessagingBroker;
  scheduler: scheduler.ISchedulerBroker;

  startTime = Date.now().toString();
  events: scheduler.ITimelineEvent[];
  onNewMessage?: () => void;

  @logging.logMethod()
  async initialize(): Promise<void> {
    const todayTimeline = await this.scheduler.today();
    this.events = todayTimeline.events;
    await this.messaging.subscribeTopic("/conversation/today", this);
  }

  @logging.logMethod()
  async shutdown(): Promise<void> {
    await this.messaging.unsubscribeTopic("/conversation/today", this.fullName);
    this.events = [];
  }

  @logging.logMethod()
  async input(message: string): Promise<void> {
    const ev = new scheduler.TimelineEvent(
      scheduler.MomentInTime.now(),
      message,
      "user:#0",
      this.fullName,
      "input"
    );

    await this.scheduler.push(ev);
    this.events.push(ev);
    if (this.onNewMessage != null) {
      this.onNewMessage();
    }
  }

  // @logging.logMethod()
  // async onMessage(messageEvent: messaging.IMessageEvent): Promise<void> {
  //   const item = messageEvent.body as scheduler.ITimelineItem;

  //   this.items.push(item);
  //   if (this.onNewMessage != null) {
  //     this.onNewMessage(item);
  //   }
  // }
}
