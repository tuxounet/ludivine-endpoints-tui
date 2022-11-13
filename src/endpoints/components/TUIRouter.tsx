import React, { useState } from "react";
import { Text, Box, useApp } from "ink";
import { Views } from "../types/Views";
import { MainView } from "../views/Main";
import { DetailView } from "../views/Detail";
const TUIRouter = (): JSX.Element => {
  const { exit } = useApp();
  const [currentView, setCurrentView] = useState<Views>("MAIN");

  function body(): JSX.Element {
    switch (currentView) {
      case "MAIN":
        return (
          <MainView exitHandler={exit} setCurrentViewHandler={setCurrentView} />
        );
      case "DETAIL":
        return <DetailView setCurrentViewHandler={setCurrentView} />;
      default:
        return (
          <>
            <Text>404</Text>
          </>
        );
    }
  }

  return (
    <Box flexDirection="column">
      <Text>Use arrow keys to move the face. Press “q” to exit.</Text>
      {body()}
    </Box>
  );
};

export default TUIRouter;
