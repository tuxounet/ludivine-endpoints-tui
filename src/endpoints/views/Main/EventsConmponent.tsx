import React, { useEffect } from "react";
import { Text, Newline, Box } from "ink";
import { TUIBackend } from "../TUIBackend";
import { messaging, scheduler } from "@ludivine/runtime";

interface EventsConmponentProps {
  backend: TUIBackend;
}

export const EventsConmponent = (props: EventsConmponentProps): JSX.Element => {
  const [facts, setFacts] = React.useState<scheduler.ITimelineEvent[]>(
    props.backend.events
  );
  useEffect(() => {
    props.backend.onNewMessage = () => {
      setFacts([...props.backend.events]);
    };
    return () => {
      props.backend.onNewMessage = undefined;
    };
  }, [props.backend.startTime]);
  return (
    <Box flexDirection="column">
      <Text>Flux:</Text>
      {facts.map((fact) => (
        <Box key={fact.hash}>
          <Text>
            {fact.when.begin.hh}:{fact.when.begin.mm}:{fact.when.begin.ss}.
            {fact.when.begin.ms} {fact.what}
          </Text>
        </Box>
      ))}
      <Newline />
    </Box>
  );
};
