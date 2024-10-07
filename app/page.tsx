import { useState } from "react";
import { styled } from "restyle";
import { Game } from "./game";

const Container = styled("div", {
  display: "flex",
  minHeight: "100vh",
  justifyContent: "center",
  alignItems: "center",
});

export default function Page() {
  return (
    <Container>
      <Game />
    </Container>
  );
}
