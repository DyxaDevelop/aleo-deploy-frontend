import React, { Fragment, useEffect, useState } from 'react';
import { BoardNumberByLetter, Colors, FigureData, Figures } from '../../types';
import styles from './Figure.module.scss';
import classNames from 'classnames';
import RookBlack from '../../svgs/rook-black.svg';
import RookWhite from '../../svgs/rook-white.svg';
import KingBlack from '../../svgs/king-black.svg';
import KingWhite from '../../svgs/king-white.svg';
import BishopBlack from '../../svgs/bishop-black.svg';
import BishopWhite from '../../svgs/bishop-white.svg';
import KnightWhite from '../../svgs/knight-black.svg';
import KnightBlack from '../../svgs/knight-white.svg';
import PawnWhite from '../../svgs/pawn-black.svg';
import PawnBlack from '../../svgs/pawn-white.svg';
import QueenWhite from '../../svgs/queen-black.svg';
import QueenBlack from '../../svgs/queen-white.svg';

interface FigureProps {
  figure: FigureData;
  figureClicked: (figure: FigureData) => void;
  isSelected?: boolean;
  isEatable?: boolean;
}

const Figure: React.FC<FigureProps> = (props: FigureProps) => {
  const figureColors = {
    dark: '#244AED',
    light: '#4EA5F1',
  };

  const position = {
    left: (props.figure.x - 1) * 12.5 + '%',
    bottom: (props.figure.y - 1) * 12.5 + '%',
  };

  const isBlack = props.figure.color === Colors.BLACK;

  const getBishop = (): JSX.Element => {
    return (
      <Fragment>
        {isBlack ? <img src={BishopBlack} /> : <img src={BishopWhite} />}
      </Fragment>
    );
  };

  const getKing = (): JSX.Element => {
    return (
      <Fragment>
        {isBlack ? <img src={KingBlack} /> : <img src={KingWhite} />}
      </Fragment>
    );
  };

  const getKnight = (): JSX.Element => {
    return (
      <Fragment>
        {isBlack ? <img src={KnightWhite} /> : <img src={KnightBlack} />}
      </Fragment>
    );
  };

  const getPawn = (): JSX.Element => {
    return (
      <Fragment>
        {isBlack ? <img src={PawnWhite} /> : <img src={PawnBlack} />}
      </Fragment>
    );
  };

  const getQueen = (): JSX.Element => {
    return (
      <Fragment>
        {isBlack ? <img src={QueenWhite} /> : <img src={QueenBlack} />}
      </Fragment>
    );
  };

  const getRook = (): JSX.Element => {
    return (
      <Fragment>
        {isBlack ? <img src={RookBlack} /> : <img src={RookWhite} />}
      </Fragment>
    );
  };

  const getFigure = (): JSX.Element => {
    switch (props.figure.name) {
      case Figures.BISHOP:
        return getBishop();
      case Figures.KING:
        return getKing();
      case Figures.KNIGHT:
        return getKnight();
      case Figures.PAWN:
        return getPawn();
      case Figures.QUEEN:
        return getQueen();
      case Figures.ROOK:
        return getRook();
    }
  };

  return (
    <div
      onClick={() => props.figureClicked(props.figure)}
      className={classNames(styles.figure, {
        [styles.figureEatable]: props.isEatable,
      })}
      style={{ left: position.left, bottom: position.bottom }}
      id={props.figure.id}
    >
      {/* <svg
        width="100%"
        height="100%"
        viewBox="0 0 72 72"
        // fill="none"
        xmlns="http://www.w3.org/2000/svg"
      > */}
      {getFigure()}
      {/* </svg> */}
    </div>
  );
};

export default Figure;
