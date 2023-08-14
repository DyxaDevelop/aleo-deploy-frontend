import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import styled from '@emotion/styled';
import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../../layouts/Sidebar';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import logoSVG from '../../assets/svg/logoForENS.svg';
import searchSVG from '../../assets/svg/searchIcon.svg';
import { IconButton } from '@mui/material';
import { Show } from 'components/Show/Show';
import { Footer } from 'layouts/Footer';
import Typewriter from 'components/TypeWriter/TypeWriter';
import { LanguageHOC } from 'hoc/langHoc';

const Container = styled.div(() => ({
  fontFamily: 'Inter',
  maxWidth: '1400px',
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: '150px',
  '@media (max-width: 768px)': {
    marginBottom: '300px',
  },
}));

const TitleBlock = styled.div(() => ({
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  backgroundClip: 'text',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '40px',
  textFillColor: 'transparent',
  marginBottom: '30px',
  '@media (max-width: 768px)': {
    display: 'none',
  },
}));

const TitleBlockMobile = styled.div(() => ({
  display: 'none',
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  backgroundClip: 'text',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '20px',
  textFillColor: 'transparent',
  marginBottom: '30px',
  '@media (max-width: 768px)': {
    display: 'block',
  },
}));

const InputSearch = styled.input(() => ({
  width: '100%',
  background:
    'linear-gradient(98.8deg, rgba(255, 255, 255, 0.08) 0.34%, rgba(255, 255, 255, 0) 100%)',
  backdropFilter: ' blur(9.20405px)',
  borderRadius: '25px',
  outline: '0',
  height: '44px',
  paddingLeft: '28px',
  fontWeight: 600,
  fontZize: '12px',
  color: '#8E8F93',
  marginBottom: '20px',
  border: '0.5px solid #333338',
  '@media (max-width: 768px)': {
    display: 'none',
  },
}));

const InputSearchMobile = styled(InputSearch)(() => ({
  display: 'none',
  width: '100%',
  background:
    'linear-gradient(98.8deg, rgba(255, 255, 255, 0.08) 0.34%, rgba(255, 255, 255, 0) 100%)',
  backdropFilter: ' blur(9.20405px)',
  borderRadius: '25px',
  outline: '0',
  height: '44px',
  paddingLeft: '28px',
  fontWeight: 600,
  fontZize: '12px',
  color: '#8E8F93',
  marginBottom: '20px',
  border: '0.5px solid #333338',
  '@media (max-width: 768px)': {
    display: 'block',
  },
}));

const Button = styled.div(() => ({
  width: '80px',
  height: '29px',
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  borderRadius: '8px',
  fontSize: '10px',
  color: '#fff',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    transition: '1s',
    background: 'linear-gradient(90.36deg, #1056FA 0.21%, #1056FA 101.74%)',
  },
}));

const EnsBlock = styled.div(() => ({
  width: '80%',
  height: '44px',
  background: '#1A1C24',
  borderRadius: '8px',
  paddingLeft: '28px',
  paddingBottom: '8px',
  paddingTop: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '14px',
}));

const Name = styled.div(() => ({
  background: '#1A1C24',
  borderRadius: '8px',
  paddingLeft: '28px',
  paddingBottom: '8px',
  paddingTop: '8px',
  display: 'flex',
  gap: '8px',
  fontStyle: 'normal',
  fontWeight: 800,
  fontSize: '14px',
  color: '#fff',
  width: '30%',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}));

const Length = styled.div(() => ({
  color: '#8E8F93',
  fontWeight: '400',
  fontSize: '12px',
  width: '15%',
}));

const Rarity = styled.div(() => ({
  color: '#8E8F93',
  fontWeight: '400',
  fontSize: '12px',
  width: '12%',
}));

const Month = styled.div(() => ({
  display: 'flex',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  width: '12%',
  alignItems: 'center',
  color: '#fff!important',
}));

const InputBTN = styled.div(() => ({
  marginLeft: '10px',
  marginRight: '10px',
  color: '#fff!important',
}));

const InputMonth = styled.input(() => ({
  width: '14px',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  padding: 0,
  outline: 0,
  border: 0,
  color: '#fff',
}));

const Price = styled.div(() => ({
  display: 'flex',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  color: '#fff',
  width: '12%',
}));

const InputBlock = styled.div(() => ({
  position: 'relative',
  width: '80%',
}));

const ImgStyle = styled.img(() => ({
  position: 'absolute',
  width: '13px',
  right: '25px',
  top: '16px',
}));

export const CreateENSPure = ({ lang }: any) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [monthValue, setMonthValue] = useState<number>(1);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleMonthValue = (value: number) => {
    if (monthValue + value == 0) {
      return;
    }
    setMonthValue(+monthValue + value);
  };

  return (
    <>
      <DefaultLayout>
        <Container>
          <Typewriter text={lang.CR_ANS} delay={70}></Typewriter>
          <TitleBlockMobile>{lang.CR_PC}</TitleBlockMobile>
          <InputBlock>
            <InputSearch
              value={inputValue}
              //@ts-ignore
              onChange={handleInputChange}
              type="text"
              placeholder="Search"
            />
            <InputSearchMobile />
            <ImgStyle src={searchSVG} />
          </InputBlock>
          <Show visible={inputValue.length > 0}>
            <EnsBlock>
              <Name>
                {' '}
                <img src={logoSVG} />
                {inputValue}.aleo
              </Name>
              <Length>
                {lang.LENG}: <b>{inputValue.length} characters</b>
              </Length>
              <Rarity>
                {lang.RARE}: <b>Rare</b>
              </Rarity>
              <Month>
                {lang.MONTH}:
                <IconButton onClick={() => handleMonthValue(-1)} size="small">
                  <InputBTN>-</InputBTN>
                </IconButton>
                <InputMonth
                  //@ts-ignore
                  onChange={(e) => {
                    //@ts-ignore
                    if (e.target.value > 0 && e.target.value < 100) {
                      //@ts-ignore
                      setMonthValue(e.target.value);
                    }
                  }}
                  value={monthValue}
                />
                <IconButton onClick={() => handleMonthValue(1)} size="small">
                  <InputBTN>+</InputBTN>
                </IconButton>
              </Month>
              <Price>
                {lang.PRICE}: {(0.12 * monthValue).toFixed(2)} ALEO
              </Price>
              <Button>{lang.BUY_N}</Button>
            </EnsBlock>
          </Show>
        </Container>
        <Footer />
      </DefaultLayout>
    </>
  );
};

export const CreateENS = LanguageHOC(CreateENSPure, 'ans');
