"use client";

import { useState, type ComponentType } from "react";
import { styled } from "restyle";

const GRID_SIZE = 5;
const GRID_CELL_COUNT = GRID_SIZE * GRID_SIZE;

const CELLS = [
  "a",
  "j",
  "k",
  "e",
  "i",
  "f",
  "t",
  "p",
  "i",
  "g",
  "u",
  "z",
  "g",
  "w",
  "h",
  "l",
  "c",
  "y",
  "l",
  "o",
  "a",
  "d",
  "k",
  "r",
  "g",
];

const Grid = styled("div", {
  display: "grid",
  inlineSize: "100vw",
  gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
  "@media (orientation: landscape)": {
    inlineSize: "60vw",
  },
});

const Cell = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  aspectRatio: "1",
  // outline: "2px solid pink",
  backgroundColor: "#3C3D37",
  textTransform: "uppercase",
});

type Selection = number[];

interface Turn {
  player: number;
  cells: Selection;
}

interface Game {
  cells: string[];
  turns: Turn[];
  draft: Selection;
  dictionary: string[];
}

function playDraft(game: Game): Game {
  const { result, reason } = isDraftValid(game);
  if (!result) {
    alert(reason);
  }

  return {
    ...game,
    draft: [],
    turns: game.turns.concat({
      player: 0,
      cells: game.draft,
    }),
  };
}

function resetDraft(game: Game): Game {
  return {
    ...game,
    draft: [],
  };
}

const invalidReasons = [
  "AlreadyPlayed",
  "NotInDictionary",
  "NotInGrid",
] as const;

type InvalidReason = (typeof invalidReasons)[number];

function isDraftValid(game: Game):
  | {
      result: false;
      reason: InvalidReason;
    }
  | {
      result: true;
      reason?: never;
    } {
  // a turn is valid if:
  // 1. it uses only letters in the grid, no more than the number of times each appears
  // 2. it has not been played before, or it is the prefix of a word that has been played before
  // 3. it appears in the dictionary

  const draftLetters = selectionToLetters(game, game.draft);

  for (const turn of game.turns) {
    // if (
    //   selectionToLetters(game, turn.cells).join("") === draftLetters.join("")
    // ) {
    //   return {
    //     result: false,
    //     reason: "AlreadyPlayed",
    //   };
    // }
    // for (const cell of game.draft) {

    // for (const index in game.draft) {
    //   // for (const index in turn.cells) {
    //   if (game.cells[game.draft[index]] !== game.cells[turn.cells[index]]) {
    //     break;
    //   }
    // }

    if (
      selectionToLetters({ cells: game.cells }, turn.cells)
        .join("")
        .startsWith(
          selectionToLetters({ cells: game.cells }, game.draft).join(""),
        )
    )
      return {
        result: false,
        reason: "AlreadyPlayed",
      };
  }

  return {
    result: true,
  };

  // const allPlayedWords = game.turns.map((turn) =>
  //   selectionToLetters(game, turn.cells),
  // );

  // if()
}

function selectionToLetters(
  { cells }: Pick<Game, "cells">,
  selection: Selection,
): string[] {
  return selection.map((index) => cells[index]);
}

export const Game: ComponentType = () => {
  const [state, setState] = useState<Game>({
    cells: CELLS,
    turns: [],
    draft: [],
    dictionary: [],
  });

  return (
    <div>
      <p>{selectionToLetters(state, state.draft)}</p>
      <button onClick={() => setState(resetDraft(state))}>Reset</button>
      <button onClick={() => setState(playDraft(state))}>Submit</button>
      <Grid>
        {Array.from({ length: GRID_CELL_COUNT }, (_, index) => (
          <Cell
            key={index}
            onClick={() =>
              setState({
                ...state,
                draft: state.draft.concat(index),
              })
            }
          >
            {CELLS[index]}
          </Cell>
        ))}
      </Grid>
      <h2>Played</h2>
      <ol>
        {state.turns.map((turn, index) => (
          <li key={index}>{selectionToLetters(state, turn.cells)}</li>
        ))}
      </ol>
    </div>
  );
};
