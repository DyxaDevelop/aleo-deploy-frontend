import React, { useMemo } from 'react';
import { WalletProvider } from '@demox-labs/aleo-wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@demox-labs/aleo-wallet-adapter-reactui';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from '@demox-labs/aleo-wallet-adapter-base';
import styled from '@emotion/styled';
require('@demox-labs/aleo-wallet-adapter-reactui/styles.css');
import WalletSVG from '../assets/svg/wallet.svg';
import AccountSVG from '../assets/svg/profile.svg';
import GamesSVG from '../assets/svg/games.svg';
import VotingSVG from '../assets/svg/voting.svg';
import LogoSVG from '../assets/svg/LOGO.svg';
import AnsSVG from '../assets/svg/ansLogo.svg';
import TwitterSVG from '../assets/svg/twitter.svg';
import DiscordSVG from '../assets/svg/discord.svg';
import GithubSVG from '../assets/svg/github.svg';
import { NavLink, useLocation } from 'react-router-dom';

const Container = styled.div(() => ({
  backgroundColor: '#171922',
  width: '170px',
  height: '100%',
  paddingTop: '48px',
  paddingBottom: '48px',
  position: 'fixed',
  boxSizing: 'border-box',
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 10,
}));

const LogoBlock = styled.div(() => ({
  paddingLeft: '23px',
  '& img': {
    width: 120,
    marginBottom: 80,
  },
}));

const ImgBlock = styled.div(() => ({
  width: '26px',
  display: 'flex',
  alignItems: 'center',
}));

const ImgBlockActive = styled(ImgBlock)(() => ({
  '& img': {
    filter: 'brightness(0) invert(1)',
  },
}));

const ItemText = styled.p(() => ({}));

const Item = styled(NavLink)(() => ({
  display: 'flex',
  textDecoration: 'none',
  gap: '25px',
  alignItems: 'center',
  color: '#999999',
  paddingTop: '14px',
  paddingBottom: '14px',
  fontWeight: 600,
  lineHeight: '11px',
  letterSpacing: '-0.415435px',
  paddingLeft: '23px',
  fontSize: '12px',
}));

const ItemActive = styled(Item)(() => ({
  marginBottom: '0',
  paddingTop: '14px',
  paddingBottom: '14px',
  color: '#fff',
  backgroundColor: '#0C6BFA',
}));

const Menu = styled.div(() => ({}));

const Links = styled.div(() => ({
  paddingLeft: '23px',
  width: '150px',
  marginTop: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  '& img': {
    width: '25px',
  },
}));

const sidebarItems = [
  {
    label: 'Wallet',
    link: '/wallet',
    icon: WalletSVG,
  },
  {
    label: 'Account',
    link: '/account',
    icon: AccountSVG,
  },
  {
    label: 'Games',
    link: '/games',
    icon: GamesSVG,
  },
  {
    label: 'Voting',
    link: '/voting',
    icon: VotingSVG,
  },
  {
    label: 'ANS',
    link: '/ens',
    icon: AnsSVG,
  },
];

const socialMedias = [
  {
    link: 'https://twitter.com/aleogameshq',
    icon: TwitterSVG,
  },
  {
    link: 'github.com',
    icon: GithubSVG,
  },
  {
    link: 'https://discord.com/invite/AleoHQ',
    icon: DiscordSVG,
  },
];

export const Sidebar = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Container>
      <LogoBlock>
        <NavLink to={'/'}>
          <img src={LogoSVG} />
        </NavLink>
      </LogoBlock>
      <Menu>
        {sidebarItems.map((elem) => {
          if (location.pathname === elem.link) {
            return (
              <ItemActive to={elem.link}>
                <ImgBlockActive>
                  <img src={elem.icon} />
                </ImgBlockActive>
                <ItemText>{elem.label}</ItemText>
              </ItemActive>
            );
          }
          return (
            <Item to={elem.link}>
              <ImgBlock>
                <img src={elem.icon} />
              </ImgBlock>
              <ItemText>{elem.label}</ItemText>
            </Item>
          );
        })}
      </Menu>
      <Links>
        {socialMedias.map((elem) => {
          return (
            <NavLink to={elem.link}>
              <img src={elem.icon} />
            </NavLink>
          );
        })}
      </Links>
    </Container>
  );
};
