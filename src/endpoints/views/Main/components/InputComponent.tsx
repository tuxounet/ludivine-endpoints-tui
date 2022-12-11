import React from "react";
import { Text, Box } from "ink";
import { UncontrolledTextInput } from "ink-text-input";
import { TUIBackend } from "../../../TUIBackend";

interface InputComponentProps {
  backend: TUIBackend;
}
export const InputComponent = (props: InputComponentProps): JSX.Element => {
  const [canInput, setCanInput] = React.useState(true);

  const onSubmit = (value: string): void => {
    setCanInput(false);
    props.backend
      .input(value)
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setCanInput(true);
      });
  };
  return (
    <Box>
      <Box marginRight={1}>
        <Text>0 &gt;</Text>
      </Box>

      {canInput && (
        <UncontrolledTextInput initialValue="" onSubmit={onSubmit} />
      )}
    </Box>
  );
};
