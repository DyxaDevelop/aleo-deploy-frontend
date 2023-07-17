import React from 'react';
import styled from '@emotion/styled';

const ModalWrap = styled.div(({}) => ({
  position: 'fixed',
  width: '100%',
  height: '100%',
  background:
    'linear-gradient(98.8deg, rgba(0, 0, 0, 0.4) 0.34%, rgba(17, 16, 97, 0) 100%)',
  backdropFilter: 'blur(10.3219px)',
  // background: theme.switch('rgba(0,0,0, 0.75)', 'rgba(255,255,255, 0.75)'),
  top: 0,
  left: 0,
  zIndex: 5,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Modal = ({ children, autoClose, onClose }: any) => (
  <ModalWrap
    onClick={() => {
      if (autoClose) {
        onClose();
      }
    }}
  >
    {children}
  </ModalWrap>
);
