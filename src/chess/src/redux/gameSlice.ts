import { Colors, FigureData } from '../types';
import { initialFigures } from '../components/Board/initialPos';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface GameState {
  color: string;
  figures: { [key: string]: FigureData };
  gameWon: string | null;
  isGameStarted: boolean;
}

const initialState: GameState = {
  color: 'white',
  figures: initialFigures,
  gameWon: null,
  isGameStarted: false,
};

export const gameSlice = createSlice({
  name: 'game', // This is the name of the slice. It will be used in actions and when accessing the store.

  initialState, // This is the initial state of the slice.

  // Reducers are functions that modify the state. Each function receives the current state and an action with payload.
  reducers: {
    // setColor is a reducer that sets the color of the game state to the payload of the action.
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },

    // changeFigurePosition is a reducer that modifies the x and y coordinates of a particular figure in the game state.
    changeFigurePosition: (
      state,
      action: PayloadAction<{ figure: FigureData; x: number; y: number }>,
    ) => {
      state.figures[action.payload.figure.id].x = action.payload.x;
      state.figures[action.payload.figure.id].y = action.payload.y;
    },

    // removeFigure is a reducer that removes a figure from the game state.
    removeFigure: (state, action: PayloadAction<FigureData>) => {
      delete state.figures[action.payload.id];
    },

    // setGameWon is a reducer that sets the winner of the game.
    setGameWon: (state, action: PayloadAction<string>) => {
      state.gameWon = action.payload;
    },

    // resetGame is a reducer that resets the game to the initial state.
    resetGame: (state) => {
      state.gameWon = initialState.gameWon;
      state.figures = initialState.figures;
      state.isGameStarted = false;
    },

    // setGameStarted is a reducer that changes the state of the game's progress.
    setGameStarted: (state, action: PayloadAction<boolean>) => {
      state.isGameStarted = action.payload;
    },
  },
});

export const {
  setColor,
  changeFigurePosition,
  removeFigure,
  setGameWon,
  resetGame,
  setGameStarted,
} = gameSlice.actions;

export const selectFigures = (state: RootState) => state.game.figures;
export const selectColor = (state: RootState) => state.game.color;
export const selectGameWon = (state: RootState) => state.game.gameWon;
export const selectIsGameStarted = (state: RootState) =>
  state.game.isGameStarted;

export default gameSlice.reducer;
