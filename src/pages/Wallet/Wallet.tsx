import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import styled from '@emotion/styled';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../../layouts/Sidebar';
import { DefaultLayout } from '../../layouts/DefaultLayout';
import walletImage from '../../assets/svg/walletImage.svg';
import logoForENS from '../../assets/svg/logoForENS.svg';
import { SuspenseImg } from 'components/SuspenseImg/SuspenseImg';
import { Footer } from 'layouts/Footer';

const Container = styled.div(() => ({
  fontFamily: 'Inter',
  maxWidth: '1400px',
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: '150px',
  '@media (max-width: 768px)': {
    paddingTop: '70px',
  },
}));

const BalanceBlock = styled.div(() => ({
  width: '80%',
  background: 'linear-gradient(90.36deg, #1056FA 0.21%, #00C7F8 101.74%)',
  borderRadius: '8px',
  height: '120px',
  color: '#fff',
  fontWeight: 700,
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '180px',
    marginBottom: '30px',
    '@media (max-width: 768px)': {
      marginBottom: '14px',
    },
  },
  marginBottom: '20px',
  '@media (max-width: 768px)': {
    width: '90%',
    height: '135px',
  },
}));

const BalanceBlockInside = styled.div(() => ({
  width: '45%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& div': {
    '@media (max-width: 768px)': {
      fontSize: '12px',
    },
  },
  '@media (max-width: 768px)': {
    width: '100%',
    justifyContent: 'flex-end',
  },
}));

const BalanceBlockBalance = styled.div(() => ({
  width: '45%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& div': {
    '@media (max-width: 768px)': {
      fontSize: '12px',
    },
  },
  '@media (max-width: 768px)': {
    width: '100%',
  },
}));

const BalanceCount = styled.div(() => ({
  fontSize: '30px',
  '@media (max-width: 768px)': {
    display: 'none',
  },
}));

const BalanceCountMobile = styled.div(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'block',
    fontSize: '16px!important',
  },
}));

const AssetItem = styled.div(() => ({
  background: '#1D2532',
  borderRadius: '8px',
  width: '80%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    width: '90%',
  },
}));

const AssetInfo = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
}));

const AssetLogo = styled.div(() => ({
  width: '45px',
  height: '45px',
  backgroundColor: '#32435d',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '12px',
  '& img': {
    width: '25px',
    height: '25px',
  },
}));

const AssetName = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  color: '#fff',
  fontWeight: 700,
  fontSize: '14px',
  '& span': {
    color: '#8F9094',
    fontWeight: 600,
    fontSize: '12px',
  },
}));

const AssetAmount = styled.div(() => ({
  display: 'flex',
  gap: '40px',
  paddingRight: '10px',
}));

const AssetItemInactive = styled(AssetItem)(() => ({
  background: '#1A1C25',
  padding: '10px',
  marginTop: '10px',
  height: '59px',
  color: '#2B2E3D',
  fontStyle: 'normal',
  fontWeight: 700,
}));

export const Wallet = () => (
  <>
    <DefaultLayout>
      <Container>
        <BalanceBlock>
          <BalanceBlockInside>
            <div>
              <div>Your Total Balance</div>
              <BalanceCount>$ 11,000.22</BalanceCount>
              <BalanceCountMobile>Use Desktop Wallet</BalanceCountMobile>
            </div>
            <SuspenseImg src={walletImage} />
          </BalanceBlockInside>
        </BalanceBlock>
        <AssetItem>
          <BalanceBlockBalance>
            <AssetInfo>
              <AssetLogo>
                <SuspenseImg src={logoForENS} />
              </AssetLogo>
              <AssetName>
                Aleo Credit
                <span>ALEO</span>
              </AssetName>
            </AssetInfo>
            <AssetAmount>
              <AssetName>
                ????
                <span>ALEO</span>
              </AssetName>
              <AssetName>
                ???
                <span>USD</span>
              </AssetName>
            </AssetAmount>
          </BalanceBlockBalance>
        </AssetItem>
        <AssetItemInactive>Soon...</AssetItemInactive>
        <AssetItemInactive>Soon...</AssetItemInactive>
        <AssetItemInactive>Soon...</AssetItemInactive>
        <AssetItemInactive>Soon...</AssetItemInactive>
        <AssetItemInactive>Soon...</AssetItemInactive>
      </Container>
      <Footer />
    </DefaultLayout>
  </>
);
