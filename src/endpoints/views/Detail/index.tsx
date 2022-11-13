import React from "react";
import { Text, Box, useInput } from "ink";
import { Views } from "../../types/Views";

interface DetailViewProps {
  setCurrentViewHandler: (view: Views) => void;
}

export const DetailView = (props: DetailViewProps): JSX.Element => {
  useInput((input, key) => {
    if (input === "q" || key.escape) {
      props.setCurrentViewHandler("MAIN");
    }

    if (key.return) {
      props.setCurrentViewHandler("MAIN");
    }
  });

  return (
    <Box flexDirection="column">
      <Text>Detail</Text>
    </Box>
  );
};
