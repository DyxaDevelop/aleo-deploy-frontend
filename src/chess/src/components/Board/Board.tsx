// @ts-nocheck
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import styles from './Board.module.scss';
import { BoardLettersByNumber, Colors, FigureData, Figures } from '../../types';
import Cell from './Cell';
import Figure from '../Figure/Figure';
import {
  changeFigurePosition,
  removeFigure,
  resetGame,
  selectColor,
  selectFigures,
  selectGameWon,
  setColor,
  setGameStarted,
  setGameWon,
} from '../../redux/gameSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useParams } from 'react-router-dom';
import { Modal } from 'components/Modal/Modal';
import winSVG from '../../../../assets/svg/win.svg';
import confettiSVG from '../../../../assets/svg/confetti.svg';
import luckySVG from '../../../../assets/svg/lucky.svg';
import secondSVG from '../../../../assets/svg/secondPlayer.svg';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { Show } from 'components/Show/Show';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import {
  Transaction,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
import styled from '@emotion/styled';

function tryParseJSON(input: string): string | object {
  try {
    return JSON.parse(input);
  } catch (error) {
    return input;
  }
}

const Button = styled.div(() => ({
  width: '80px',
  height: '29px',
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#fff',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  zIndex: 100,
  '&:hover': {
    transition: '1s',
    background: 'linear-gradient(90.36deg, #1056FA 0.21%, #1056FA 101.74%)',
  },
}));

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const gameColor = useAppSelector(selectColor);
  const figures = useAppSelector(selectFigures);
  const gameWon = useAppSelector(selectGameWon);
  const [figureClickedBlock, setFigureClickedBlock] = useState(false);
  const [lastEnemyMove, setLastEnemyMove] = useState('');

  const mintTokens = async () => {
    const parsedInputs: any = [
      publicKey,
      '5000u64',
      '5000000u128',
      //@ts-ignore
    ].map((elem) => tryParseJSON(elem));

    const aleoTransaction = Transaction.createTransaction(
      //@ts-ignore
      publicKey,
      WalletAdapterNetwork.Testnet,
      'aleogamestoken.aleo',
      'mint_public',
      parsedInputs,
      '100000',
    );
    //@ts-ignore
    const txId =
      (await (wallet?.adapter as LeoWalletAdapter).requestTransaction(
        aleoTransaction,
      )) || '';
    //@ts-ignore
  };

  let [isKingInCheck, setIsKingInCheck] = useState<boolean>(false);
  let dangerousCells: MutableRefObject<{
    white: { [key: string]: boolean };
    black: { [key: string]: boolean };
  }> = useRef({ white: {}, black: {} });

  const sides = {
    ally: gameColor,
    enemy: gameColor === Colors.WHITE ? Colors.BLACK : Colors.WHITE,
  };
  const boardRef = useRef<HTMLDivElement>(null);
  const [choseFigurePos, setChoseFigurePos] = useState<{
    figure: FigureData;
    availableCells: { [key: string]: boolean };
    currentPos: { [key: string]: boolean };
  } | null>(null);

  const cellsFigure: { [key: string]: FigureData | null } = {};

  // Function to check if a cell is available for move
  const isAvailableCellForMove = (x: number, y: number): boolean => {
    if (choseFigurePos && choseFigurePos.availableCells[`${x}-${y}`]) {
      return true;
    }
    return false;
  };

  // Function to check if a cell has a figure
  const isCellHavingFigure = (x: number, y: number): boolean => {
    return cellsFigure[`${x}-${y}`] ? true : false;
  };

  // Function to move a figure to a new position
  const moveOn = (figure: FigureData, x: number, y: number) => {
    cellsFigure[`${figure.x}-${figure.y}`] = null;
    cellsFigure[`${x}-${y}`] = figure;
    dispatch(changeFigurePosition({ figure, x, y }));
    setChoseFigurePos(null);
  };

  // Function to handle cell click event
  const cellClicked = (x: number, y: number): void => {
    if (!choseFigurePos) return;
    if (!choseFigurePos.availableCells[`${x}-${y}`]) return;
    // console.log('Moved');
    sendMyMessage(choseFigurePos.figure, x, y, choseFigurePos.currentPos);
    moveOn(choseFigurePos.figure, x, y);
    // nextAIMoveDelayed();
  };

  // Function to initialize the board cells
  const initCells = (): JSX.Element[] => {
    const cells: JSX.Element[] = [];
    for (let y = 8; y >= 1; y--) {
      for (let x = 1; x <= 8; x++) {
        cellsFigure[`${x}-${y}`] = null;
        const boardLetter = BoardLettersByNumber[x];
        if ((y + x) % 2 !== 0) {
          cells.push(
            <Cell
              color={Colors.BLACK}
              x={boardLetter}
              y={y}
              key={`${boardLetter}-${y}`}
              isAvailableForMove={isAvailableCellForMove(x, y)}
              isHavingFigure={isCellHavingFigure(x, y)}
              cellClicked={cellClicked}
              isSelected={isSelectedCell(x, y)}
            />,
          );
        } else {
          cells.push(
            <Cell
              color={Colors.WHITE}
              x={boardLetter}
              y={y}
              key={`${boardLetter}-${y}`}
              isAvailableForMove={isAvailableCellForMove(x, y)}
              isHavingFigure={isCellHavingFigure(x, y)}
              cellClicked={cellClicked}
              isSelected={isSelectedCell(x, y)}
            />,
          );
        }
      }
    }
    return cells;
  };

  // Function to check if a figure is eatable by the selected figure
  const isEatableFigure = (figure: FigureData): boolean => {
    if (!choseFigurePos) return false;
    return choseFigurePos.availableCells[`${figure.x}-${figure.y}`];
  };

  // Function to check if a figure is currently selected
  const isSelectedFigure = (figure: FigureData): boolean => {
    if (!choseFigurePos) return false;
    return choseFigurePos.figure.id === figure.id;
  };

  // Function to check if a cell is currently selected
  const isSelectedCell = (x: number, y: number): boolean => {
    if (!choseFigurePos) return false;
    return choseFigurePos.figure.x === x && choseFigurePos.figure.y === y;
  };

  // Function to initialize the figures on the game board
  const initFigures = (): JSX.Element[] => {
    const figuresJSX: JSX.Element[] = [];

    for (let item in figures) {
      if (!figures[item].id || !figures[item].color) continue;
      cellsFigure[`${figures[item].x}-${figures[item].y}`] = figures[item];
      figuresJSX.push(
        <Figure
          figureClicked={figureClicked}
          key={figures[item].id}
          figure={figures[item]}
          isEatable={isEatableFigure(figures[item])}
          isSelected={isSelectedFigure(figures[item])}
        />,
      );
    }

    return figuresJSX;
  };

  // Function to resize the game board
  const resizeBoard = () => {
    const paddingsWidth = 48 + 12;
    const paddingHeight = 52 + 12;

    if (boardRef.current) {
      const board = boardRef.current;
      board.style.height = '';
      board.style.width = '';

      const boardRect = board.getBoundingClientRect();
      const boardWidth = boardRect.width - paddingsWidth + paddingHeight;
      const boardHeight = boardRect.height - paddingHeight + paddingsWidth;

      if (boardHeight > boardWidth) {
        board.style.height = boardWidth + 'px';
      } else {
        board.style.width = boardHeight + 'px';
      }
    }
  };

  // Function to handle the click event on a figure
  const figureClicked = (figure: FigureData) => {
    if (figureClickedBlock) {
      return;
    }
    // Check if there is a selected figure, and if the clicked cell is a valid move and not occupied by an ally
    if (
      choseFigurePos &&
      choseFigurePos.availableCells[`${figure.x}-${figure.y}`] &&
      choseFigurePos.figure.color !== figure.color
    ) {
      // console.log(1);
      moveOrEat(choseFigurePos.figure, figure.x, figure.y);
      // console.log(figure.x, figure.y);
      // nextAIMoveDelayed();
      return;
    }

    // Check if the clicked figure is already selected, if so, deselect it
    if (
      choseFigurePos &&
      choseFigurePos.figure.name === figure.name &&
      figure.x === choseFigurePos.figure.x &&
      choseFigurePos.figure.y === figure.y &&
      choseFigurePos.figure.color === figure.color
    ) {
      // console.log(2);
      setChoseFigurePos(null);
      return;
    }

    // Check if the clicked figure belongs to the ally side, and if it's not the king in check
    if (sides.ally !== figure.color) return;
    if (isKingInCheck && figure.name !== Figures.KING) return;
    // console.log(3);
    // console.log('setChoseFigurePos');
    // console.log(figure.x, figure.y);
    // console.log('setChoseFigurePos');

    // Select the clicked figure and update the available cells for it
    setChoseFigurePos({
      figure,
      availableCells: getAvailableCells(figure),
      currentPos: {
        x: figure.x,
        y: figure.y,
      },
    });
    // console.log(4);
  };

  // Function to end the game and declare the winner
  const endGame = (winner: Colors) => {
    sendMessage(
      JSON.stringify({
        //@ts-ignore
        color: winner,
        win: true,
      }),
    );
  };

  // Function to handle eating a figure
  const eatFigure = (figure: FigureData): void => {
    cellsFigure[`${figure.x}-${figure.y}`] = null;
    // console.log(figure);
    if (figure.name === Figures.KING) {
      endGame(getOtherColor(figure.color));
    }
    dispatch(removeFigure(figure));
  };

  // Function to handle moving or eating a figure to a specific cell
  const moveOrEat = (figure: FigureData, x: number, y: number): void => {
    const figureOnCell = cellsFigure[`${x}-${y}`];
    // console.log('CONFIRMED');
    // console.log(figure);
    // console.log(x);
    // console.log(y);
    // console.log('CONFIRMED');
    if (figureOnCell && figureOnCell.color !== figure.color) {
      eatFigure(figureOnCell);
      if (figureOnCell.color !== playerColor)
        sendMyMessage(
          figure,
          x,
          y,
          {
            x: figure.x,
            y: figure.y,
          },
          true,
        );
    }
    // console.log(figure);
    // sendMyMessage(choseFigurePos.figure, x, y, choseFigurePos.currentPos);
    moveOn(figure, x, y);
  };

  // Function to get the available cells for a figure
  const getAvailableCells = (
    figure: FigureData,
    isForDangerousCells: boolean = false,
    isEnemy: boolean = false,
  ): { [key: string]: boolean } => {
    let way: { y: number; x: number }[] = [];

    // Helper function to check if the movement should be stopped at a certain cell
    const toStopWay = (x: number, y: number): boolean => {
      if (cellsFigure[`${x}-${y}`] === undefined) return true;
      if (cellsFigure[`${x}-${y}`]) return true;
      return false;
    };

    // Helper function to check if a cell is valid for movement and add it to the way
    const checkCellForMove = (x: number, y: number): boolean => {
      if (toStopWay(x, y)) return false;
      way.push({ x, y });
      return true;
    };

    // Function to move vertically from the current position to the specified y coordinate
    const verticalTop = (toY: number, fromY: number = figure.y) => {
      for (let i = fromY + 1; i <= toY; i++) {
        if (toStopWay(figure.x, i)) return;
        way.push({ y: i, x: figure.x });
      }
    };

    // Function to move vertically in the opposite direction (down) from the current position to the specified y coordinate
    const verticalBottom = (toY: number, fromY: number = figure.y) => {
      for (let i = fromY - 1; i >= toY; i--) {
        if (toStopWay(figure.x, i)) return;
        way.push({ y: i, x: figure.x });
      }
    };

    // Function to move horizontally from the current position to the specified x coordinate
    const horizontalLeft = (toX: number, fromX: number = figure.x) => {
      for (let i = fromX - 1; i >= toX; i--) {
        if (toStopWay(i, figure.y)) return;
        way.push({ x: i, y: figure.y });
      }
    };

    // Function to move horizontally in the opposite direction (right) from the current position to the specified x coordinate
    const horizontalRight = (toX: number, fromX: number = figure.x) => {
      for (let i = fromX + 1; i <= toX; i++) {
        if (toStopWay(i, figure.y)) return;
        way.push({ x: i, y: figure.y });
      }
    };

    // Function to check diagonal movements
    const checkDiagonal = () => {
      // top right
      for (let i = 1; i <= 8; i++) {
        if (!checkCellForMove(figure.x + i, figure.y + i)) break;
      }
      // bottom right
      for (let i = 1; i <= 8; i++) {
        if (!checkCellForMove(figure.x + i, figure.y - i)) break;
      }
      // bottom left
      for (let i = 1; i <= 8; i++) {
        if (!checkCellForMove(figure.x - i, figure.y - i)) break;
      }
      // top left
      for (let i = 1; i <= 8; i++) {
        if (!checkCellForMove(figure.x - i, figure.y + i)) break;
      }
    };

    // Function to check eatable figures by diagonal movements
    const checkEatableFiguresByDiagonal = () => {
      // top right
      for (let i = 1; i <= 8; i++) {
        if (checkEatableOrAlliesCell(figure.x + i, figure.y + i)) break;
      }
      // bottom right
      for (let i = 1; i <= 8; i++) {
        if (checkEatableOrAlliesCell(figure.x + i, figure.y - i)) break;
      }
      // bottom left
      for (let i = 1; i <= 8; i++) {
        if (checkEatableOrAlliesCell(figure.x - i, figure.y - i)) break;
      }
      // top left
      for (let i = 1; i <= 8; i++) {
        if (checkEatableOrAlliesCell(figure.x - i, figure.y + i)) break;
      }
    };

    // Function to check if a cell is eatable by the figure
    const isEatableCell = (x: number, y: number): boolean => {
      if (
        cellsFigure[`${x}-${y}`] &&
        figure.color !== cellsFigure[`${x}-${y}`]?.color
      ) {
        return true;
      }
      return false;
    };

    // Function to check and add an eatable cell to the available cells
    const checkEatableCell = (x: number, y: number): boolean => {
      if (isEatableCell(x, y)) {
        way.push({ x, y });
        return true;
      }
      return false;
    };

    // Function to check if a cell is eatable or occupied by an ally figure
    const checkEatableOrAlliesCell = (x: number, y: number): boolean => {
      if (
        cellsFigure[`${x}-${y}`] &&
        cellsFigure[`${x}-${y}`]?.color === figure.color
      ) {
        return true;
      }
      if (isEatableCell(x, y)) {
        way.push({ x, y });
        return true;
      }
      return false;
    };

    // PAWN
    const checkEatableFiguresByPawn = () => {
      if (figure.color === Colors.BLACK) {
        checkEatableCell(figure.x - 1, figure.y - 1);
        checkEatableCell(figure.x + 1, figure.y - 1);
      } else {
        checkEatableCell(figure.x - 1, figure.y + 1);
        checkEatableCell(figure.x + 1, figure.y + 1);
      }
    };

    if (figure.name === Figures.PAWN) {
      if (figure.color === Colors.BLACK) {
        if (!isForDangerousCells) {
          if (figure.y == 7) {
            verticalBottom(figure.y - 2);
          } else {
            verticalBottom(figure.y - 1);
          }
        } else {
          way.push({ y: figure.y - 1, x: figure.x - 1 });
          way.push({ y: figure.y - 1, x: figure.x + 1 });
        }
      }
      if (figure.color === Colors.WHITE) {
        if (!isForDangerousCells) {
          if (figure.y == 2) {
            verticalTop(figure.y + 2);
          } else {
            verticalTop(figure.y + 1);
          }
        } else {
          way.push({ y: figure.y + 1, x: figure.x - 1 });
          way.push({ y: figure.y + 1, x: figure.x + 1 });
        }
      }
      checkEatableFiguresByPawn();
    }

    // ROOK
    const checkEatableFiguresByRook = () => {
      // check top
      for (let i = figure.y + 1; i <= 8; i++) {
        if (checkEatableOrAlliesCell(figure.x, i)) break;
      }
      // check bottom
      for (let i = figure.y - 1; i >= 0; i--) {
        if (checkEatableOrAlliesCell(figure.x, i)) break;
      }
      // check left
      for (let i = figure.x - 1; i >= 0; i--) {
        if (checkEatableOrAlliesCell(i, figure.y)) break;
      }
      // check right
      for (let i = figure.x + 1; i <= 8; i++) {
        if (checkEatableOrAlliesCell(i, figure.y)) break;
      }
    };

    if (figure.name === Figures.ROOK) {
      verticalBottom(0);
      verticalTop(8);
      horizontalLeft(0);
      horizontalRight(8);
      checkEatableFiguresByRook();
    }

    // KNIGHT
    const checkMovesByKnight = () => {
      checkCellForMove(figure.x + 1, figure.y + 2);
      checkCellForMove(figure.x - 1, figure.y + 2);
      checkCellForMove(figure.x + 2, figure.y + 1);
      checkCellForMove(figure.x + 2, figure.y - 1);
      checkCellForMove(figure.x + 1, figure.y - 2);
      checkCellForMove(figure.x - 1, figure.y - 2);
      checkCellForMove(figure.x - 2, figure.y - 1);
      checkCellForMove(figure.x - 2, figure.y + 1);
    };

    const checkEatableFiguresByKnight = () => {
      checkEatableOrAlliesCell(figure.x + 1, figure.y + 2);
      checkEatableOrAlliesCell(figure.x - 1, figure.y + 2);
      checkEatableOrAlliesCell(figure.x + 2, figure.y + 1);
      checkEatableOrAlliesCell(figure.x + 2, figure.y - 1);
      checkEatableOrAlliesCell(figure.x + 1, figure.y - 2);
      checkEatableOrAlliesCell(figure.x - 1, figure.y - 2);
      checkEatableOrAlliesCell(figure.x - 2, figure.y - 1);
      checkEatableOrAlliesCell(figure.x - 2, figure.y + 1);
    };

    if (figure.name === Figures.KNIGHT) {
      checkMovesByKnight();
      checkEatableFiguresByKnight();
    }

    // BISHOP
    if (figure.name === Figures.BISHOP) {
      checkDiagonal();
      checkEatableFiguresByDiagonal();
    }

    // QUEEN
    if (figure.name === Figures.QUEEN) {
      checkDiagonal();
      checkEatableFiguresByDiagonal();
      verticalBottom(0);
      verticalTop(8);
      horizontalLeft(0);
      horizontalRight(8);
      checkEatableFiguresByRook();
    }

    // KING
    const checkKingDiagonal = () => {
      checkCellForMove(figure.x + 1, figure.y + 1);
      checkCellForMove(figure.x + 1, figure.y - 1);
      checkCellForMove(figure.x - 1, figure.y - 1);
      checkCellForMove(figure.x - 1, figure.y + 1);
    };

    const checkEatableFiguresByKing = () => {
      checkEatableOrAlliesCell(figure.x + 1, figure.y + 1);
      checkEatableOrAlliesCell(figure.x + 1, figure.y - 1);
      checkEatableOrAlliesCell(figure.x - 1, figure.y - 1);
      checkEatableOrAlliesCell(figure.x - 1, figure.y + 1);
      checkEatableOrAlliesCell(figure.x + 1, figure.y);
      checkEatableOrAlliesCell(figure.x - 1, figure.y);
      checkEatableOrAlliesCell(figure.x, figure.y + 1);
      checkEatableOrAlliesCell(figure.x, figure.y - 1);
    };

    if (figure.name === Figures.KING) {
      verticalBottom(figure.y - 1);
      verticalTop(figure.y + 1);
      horizontalLeft(figure.x - 1);
      horizontalRight(figure.x + 1);
      checkKingDiagonal();
      checkEatableFiguresByKing();

      const cellsForRemoving: { x: number; y: number }[] = [];
      for (let i = 0; i < way.length; i++) {
        if (
          dangerousCells.current[getOtherColor(figure.color)][
            `${way[i].x}-${way[i].y}`
          ]
        ) {
          cellsForRemoving.push({ x: way[i].x, y: way[i].y });
        }
      }
      cellsForRemoving.forEach((elw) => {
        way = way.filter((el) => !(el.y === elw.y && el.x === elw.x));
      });
    }

    const obj: { [key: string]: boolean } = {};
    way.forEach((el) => {
      obj[`${el.x}-${el.y}`] = true;
    });
    console.log('-------------');
    console.log(figure.name);
    console.log(obj);
    console.log('-------------');
    if (figure.name === 'king') {
      if (Object.keys(obj).length == 0) {
        endGame(figure.color);
      }
    }
    return obj;
  };

  // Executes the AI's next move
  const nextAIMove = (message) => {
    const [x, y] = message.target_position.split('');

    const xformatted = [0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    setLastEnemyMove({
      figure: figures[message.id],
      x: Number(xformatted.indexOf(x)),
      y: Number(y),
    });
    moveOrEat(figures[message.id], Number(xformatted.indexOf(x)), Number(y));
  };

  // Get all figures of a specific color
  const getFiguresBySide = (color: Colors) => {
    return Object.keys(figures)
      .filter((figureId) => figures[figureId].color === color)
      .map((figureId) => figures[figureId]);
  };

  // Update available cells for all figures of both colors
  const updateAllAvailableCells = () => {
    dangerousCells.current.white = {};
    dangerousCells.current.black = {};

    const whiteFigures = getFiguresBySide(Colors.WHITE);
    const blackFigures = getFiguresBySide(Colors.BLACK);

    // Update available cells for white figures
    whiteFigures.forEach((figure) => {
      dangerousCells.current.white = {
        ...dangerousCells.current.white,
        ...getAvailableCells(figure, true),
      };
    });

    // Update available cells for black figures
    blackFigures.forEach((figure) => {
      dangerousCells.current.black = {
        ...dangerousCells.current.black,
        ...getAvailableCells(figure, true),
      };
    });
  };

  // Utility function to get the color opposite to the given color
  const getOtherColor = (color: Colors) => {
    return color === Colors.BLACK ? Colors.WHITE : Colors.BLACK;
  };

  // Check if the king of the specified color is in check
  const checkIsKingInCheck = (color: Colors) => {
    updateAllAvailableCells();

    // Get the kings of both colors
    const kings = {
      [Colors.WHITE]: figures['white-king-5-1'],
      [Colors.BLACK]: figures['black-king-5-8'],
    };

    const king = kings[color];
    if (!king) return;

    // console.log('DANGEROUS ');
    // console.log(king);
    // console.log(dangerousCells);
    // console.log(dangerousCells.current);
    // console.log(
    //   dangerousCells.current[getOtherColor(color)][`${king.x}-${king.y}`],
    // );
    // console.log('DANGEROUS ');
    // Check if the king's position is in the dangerous cells of the opposite color
    if (dangerousCells.current[getOtherColor(color)][`${king.x}-${king.y}`])
      setIsKingInCheck(true);
    else setIsKingInCheck(false);
  };

  // Generate JSX for the game won modal
  const getGameWonJSX = (): JSX.Element | null => {
    if (!gameWon) return null;

    const color = gameWon[0].toUpperCase() + gameWon.slice(1);
    if (playerColor !== gameWon) {
      return (
        <Modal>
          <div className={styles.gameWon}>
            <h2 className={styles.gameWonTitle}>Congratulations!</h2>
            <h2 className={styles.gameWonTitleDesc}>
              You can mint some tokens!
            </h2>
            <Button onClick={() => mintTokens()}>Mint</Button>
            <img src={confettiSVG} style={{ position: 'absolute' }} />
            <img style={{ marginBottom: '-12px' }} src={winSVG} />
          </div>
        </Modal>
      );
    }
    return (
      <Modal>
        <div className={styles.gameWon}>
          <h2 className={styles.gameWonTitle}>Sorry {':('}</h2>
          <h2 className={styles.gameWonTitleDesc}>
            Today is not your lucky day.
          </h2>
          <img style={{ marginBottom: '-12px' }} src={luckySVG} />
        </div>
      </Modal>
    );
  };

  const { wallet, publicKey, requestRecords } = useWallet();
  const { id } = useParams();
  const [playerNumber, setPlayerNumber] = useState();
  const [playerColor, setPlayerColor] = useState();
  const [showWaitModal, setShowWaitModal] = useState(false);

  // Check if the king is in check when the figures state changes
  useEffect(() => {
    if (lastEnemyMove?.figure) {
      console.log(lastEnemyMove?.figure);
      console.log(getAvailableCells(lastEnemyMove?.figure, false, true));
      checkIsKingInCheck(sides.ally);
    }
  }, [figures]);

  const WS_URL = 'wss://168.119.178.26:8000/ws/chess/afs/';

  const socketUrl = 'wss://168.119.178.26:8000/ws/chess/' + id + '/';
  const { lastMessage, sendMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    // Handle new messages
    if (lastMessage) {
      //@ts-ignore
      const lastMessageNew = JSON.parse(lastMessage.data);
      switch (lastMessageNew.message.message_type) {
        case 'timer':
          break;
        // statements;
        case 'first_message':
          // console.log(lastMessageNew);
          // console.log(lastMessage.data);
          if (lastMessageNew.message.player_number === 1) {
            // @ts-ignore
            setPlayerNumber(1);
            setPlayerColor(lastMessageNew.message.color);
            dispatch(setColor(lastMessageNew.message.color));
            setShowWaitModal(true);
          }
          if (lastMessageNew.message.player_number === 2) {
            if (!playerColor) {
              // @ts-ignore
              setPlayerNumber(2);
              setPlayerColor(lastMessageNew.message.color);
              dispatch(setColor(lastMessageNew.message.color));
              setShowWaitModal(false);
              resizeBoard();
              window.addEventListener('resize', resizeBoard);
              dispatch(setGameStarted(true));
            } else {
              setFigureClickedBlock(true);
              setShowWaitModal(false);
              resizeBoard();
              window.addEventListener('resize', resizeBoard);
              dispatch(setGameStarted(true));
            }
          }
          break;
        case 'move':
          console.log(lastMessageNew);
          console.log(lastMessage.data);
          if (playerColor === lastMessageNew.message.color) {
            setFigureClickedBlock(true);
            // moveOrEat()
          } else {
            setFigureClickedBlock(false);
            if (lastMessageNew.message.is_captured) {
            }
            // console.log('move');
            nextAIMove(lastMessageNew.message);
          }
          break;
        case 'result':
          console.log(lastMessage.data);
          dispatch(setGameWon(lastMessageNew.message.color));
          dispatch(setGameStarted(false));
          break;
        default:
        // default:
        //   statements;
      }
      // Handle the received message as needed
    }
  }, [lastMessage]);

  // useEffect(() => {
  //   console.log(choseFigurePos);
  // }, [choseFigurePos]);

  // Send a message (example)
  const sendMyMessage = (figure, x, y, current, is_captured) => {
    const xformatted = [0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    // console.log(figure.id);
    //@ts-ignore
    sendMessage(
      JSON.stringify({
        //@ts-ignore
        init_position: xformatted[current.x] + current.y,
        target_position: xformatted[x] + y,
        piece_name: figure.name,
        is_captured: is_captured && true,
        action_move_color: playerColor,
        id: figure.id,
      }),
    );
  };

  return (
    <div className="app">
      {' '}
      <Show visible={showWaitModal}>
        <Modal>
          <div className={styles.gameWon}>
            <h2 className={styles.gameWonTitle}>
              Waiting for second player...
            </h2>
            <img style={{ width: '305px' }} src={secondSVG} />
          </div>
        </Modal>
      </Show>
      <div className={styles.boardWrapper} ref={boardRef}>
        <ul className={styles.boardLeft}>
          <li className={styles.boardLeftItem}>1</li>
          <li className={styles.boardLeftItem}>2</li>
          <li className={styles.boardLeftItem}>3</li>
          <li className={styles.boardLeftItem}>4</li>
          <li className={styles.boardLeftItem}>5</li>
          <li className={styles.boardLeftItem}>6</li>
          <li className={styles.boardLeftItem}>7</li>
          <li className={styles.boardLeftItem}>8</li>
        </ul>

        <ul className={styles.boardBottom}>
          <li className={styles.boardBottomItem}>A</li>
          <li className={styles.boardBottomItem}>B</li>
          <li className={styles.boardBottomItem}>C</li>
          <li className={styles.boardBottomItem}>D</li>
          <li className={styles.boardBottomItem}>E</li>
          <li className={styles.boardBottomItem}>F</li>
          <li className={styles.boardBottomItem}>G</li>
          <li className={styles.boardBottomItem}>H</li>
        </ul>

        <ul className={styles.board}>
          {initCells()}
          {initFigures()}
        </ul>

        {getGameWonJSX()}
      </div>
    </div>
  );
};

export default Board;
