import React, { useEffect } from "react";
import { Text, Newline, Box } from "ink";
import { TUIBackend } from "../../../TUIBackend";
import { messaging } from "@ludivine/runtime";

interface EventsConmponentProps {
  backend: TUIBackend;
}

export const EventsConmponent = (props: EventsConmponentProps): JSX.Element => {
  const [facts, setFacts] = React.useState<messaging.IMessageEvent[]>(
    props.backend.facts
  );
  useEffect(() => {
    props.backend.onNewMessage = (message) => {
      setFacts([...props.backend.facts]);
    };
    return () => {
      props.backend.onNewMessage = undefined;
    };
  }, [props.backend.startTime]);
  return (
    <Box flexDirection="column">
      <Text>Evenements:</Text>
      {facts.map((fact, index) => (
        <Box key={index}>
          <Text>{JSON.stringify(fact.body)}</Text>
        </Box>
      ))}
      <Newline />
    </Box>
  );
};
