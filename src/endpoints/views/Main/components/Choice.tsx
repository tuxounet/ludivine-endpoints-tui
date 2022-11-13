import React from "react";
import { Text, Newline } from "ink";

import { ChoiceEntry } from "../../../types/ChoiceEntry";

export interface ChoiceProps {
  choice: ChoiceEntry;
  current: number;
}

export const Choice = (props: ChoiceProps): JSX.Element => {
  return (
    <>
      <Text
        color={props.current === props.choice.id ? "black" : "white"}
        backgroundColor={props.current === props.choice.id ? "white" : "black"}
      >
        {props.choice.title}
        {props.choice.withSeparator === true && <Newline></Newline>}
      </Text>
    </>
  );
};
