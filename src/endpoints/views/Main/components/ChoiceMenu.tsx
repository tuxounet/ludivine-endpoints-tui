import React from "react";
import { ChoiceEntry } from "../../../types/ChoiceEntry";

import { Choice } from "./Choice";

export interface ChoiceMenuProps {
  choices: ChoiceEntry[];
  current: number;
}
export const ChoiceMenu = (props: ChoiceMenuProps): JSX.Element => {
  return (
    <>
      {props.choices.map((item) => (
        <Choice key={item.id} choice={item} current={props.current} />
      ))}
    </>
  );
};
