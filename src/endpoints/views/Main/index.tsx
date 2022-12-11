import React from "react";
import { Box } from "ink";
import { TUIBackend } from "../../TUIBackend";

import { EventsConmponent } from "./components/EventsConmponent";
import { InputComponent } from "./components/InputComponent";
interface MainViewProps {
  exitHandler: () => void;
  backend: TUIBackend;
}

export const MainView = (props: MainViewProps): JSX.Element => {
  return (
    <Box flexDirection="column">
      <EventsConmponent backend={props.backend} />
      <InputComponent backend={props.backend} />
    </Box>
  );
};
