import React from "react";
import { useApp } from "ink";

import { MainView } from "../views/Main";
import { TUIBackend } from "../TUIBackend";

interface TUIRouterProps {
  backend: TUIBackend;
}

const TUIRouter = (props: TUIRouterProps): JSX.Element => {
  const { exit } = useApp();

  return <MainView exitHandler={exit} backend={props.backend} />;
};

export default TUIRouter;
