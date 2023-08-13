import React, { useRef } from 'react';
import styles from './Main.module.scss';
import RadioButton from '../RadioButton/RadioButton';
import { Link, useLocation } from 'react-router-dom';
import {
  resetGame,
  selectColor,
  selectIsGameStarted,
  setColor,
} from '../../redux/gameSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Colors } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { v4 as uuidv4 } from 'uuid';

let randomUuid = uuidv4();

const Main: React.FC = () => {
  useLocation();
  const navigate = useNavigate();
  const color = useAppSelector(selectColor);
  const isGameStarted = useAppSelector(selectIsGameStarted);
  const dispatch = useAppDispatch();

  // const WS_URL = 'ws://168.119.178.26:8000/ws/chess/saf142124sfaasf/';

  // useWebSocket(WS_URL, {
  //   onOpen: () => {
  //     console.log('WebSocket connection established.');
  //   },
  // });

  const radioChanged = (id: string) => {
    dispatch(setColor(id as Colors));
  };

  const startNewGame = () => {
    dispatch(resetGame());
    navigate('/chess/game');
  };

  return (
    <div className="app">
      <div className={styles.wrapper}>
        <div className={styles.logo}></div>
        <h2>Choose side</h2>
        <form>
          <RadioButton
            value="White"
            handleChange={radioChanged}
            name="radio"
            isChecked={color === 'white'}
          />
          <RadioButton
            value="Black"
            handleChange={radioChanged}
            name="radio"
            isChecked={color === 'black'}
          />
        </form>
        {isGameStarted && (
          <Link to="game" className={styles.button}>
            Continue
          </Link>
        )}
        <a href="#" onClick={startNewGame} className={styles.button}>
          Start new game
        </a>
      </div>
    </div>
  );
};

export default Main;
