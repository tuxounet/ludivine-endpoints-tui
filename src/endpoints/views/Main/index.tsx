import React, { useEffect, useState } from "react";
import { Box, useInput, useFocusManager } from "ink";
import { Views } from "../../types/Views";
import { ChoiceMenu } from "./components/ChoiceMenu";
import { ChoiceEntry } from "../../types/ChoiceEntry";

interface MainViewProps {
  exitHandler: () => void;
  setCurrentViewHandler: (view: Views) => void;
}

export const MainView = (props: MainViewProps): JSX.Element => {
  const { enableFocus } = useFocusManager();

  useEffect(() => {
    enableFocus();
  }, []);

  const [current, setCurrent] = useState(0);

  const choices: ChoiceEntry[] = [
    { id: 0, title: "choix n°1" },
    { id: 1, title: "choix n°2" },
    { id: 2, title: "choix n°3" },
    { id: 3, title: "choix n°4" },
    { id: 4, title: "choix n°5", withSeparator: true },
    { id: 5, title: "choix n°6" },
  ];

  useInput((input, key) => {
    if (input === "q" || key.escape) {
      props.exitHandler();
    }

    if (key.upArrow) {
      if (current > 0) setCurrent(current - 1);
      else setCurrent(0);
    }

    if (key.downArrow) {
      if (current < choices.length - 1) setCurrent(current + 1);
      else setCurrent(choices.length - 1);
    }

    if (key.return) {
      props.setCurrentViewHandler("DETAIL");
      //   console.dir(choices.find((item) => item.id === current));
    }
  });

  return (
    <Box flexDirection="column">
      <ChoiceMenu choices={choices} current={current}></ChoiceMenu>
    </Box>
  );
};
