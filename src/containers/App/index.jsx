import React, { useEffect } from "react";
import { AppContainer, MainContainer } from "./styled";
import { EditorSection } from "../EditorSection";
import { SimulatorContainer } from "../SimulatorSection";
import { Header } from "../../components/Header";
import { CloseBar } from "../../components/CloseBar";
import { HelpButton } from "../../components/HelpButton";

export const App = () => {
  return (
    <MainContainer>
      <Header />
      <AppContainer>
        <EditorSection />
        {/* <CloseBar /> */}
        <SimulatorContainer />
      </AppContainer>
      <HelpButton />
    </MainContainer>
  );
};
