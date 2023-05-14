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
import TwitterSVG from '../assets/svg/twitter.svg';
import DiscordSVG from '../assets/svg/discord.svg';
import GithubSVG from '../assets/svg/github.svg';
import { NavLink } from 'react-router-dom';

const Container = styled.div(() => ({
  backgroundColor: '#171922',
  width: '256px',
  height: '100%',
  paddingTop: '48px',
  paddingLeft: '23px',
  paddingBottom: '48px',
  position: 'fixed',
  boxSizing: 'border-box',
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 2,
}));

const LogoBlock = styled.div(() => ({
  '& img': {
    width: 115,
    marginBottom: 80,
  },
}));

const ImgBlock = styled.div(() => ({
  width: '41px',
  display: 'flex',
  alignItems: 'center',
}));

const ItemText = styled.p(() => ({
  color: '#999999',
}));

const Item = styled(NavLink)(() => ({
  display: 'flex',
  textDecoration: 'none',
  gap: '30px',
  alignItems: 'center',
  color: '#999999',
  marginBottom: '28px',
}));

const Menu = styled.div(() => ({}));

const Links = styled.div(() => ({
  width: '150px',
  marginTop: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
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
];

const socialMedias = [
  {
    link: 'twitter.com',
    icon: TwitterSVG,
  },
  {
    link: 'github.com',
    icon: GithubSVG,
  },
  {
    link: 'discord.com',
    icon: DiscordSVG,
  },
];

export const Sidebar = () => {
  return (
    <Container>
      <LogoBlock>
        <img src={LogoSVG} />
      </LogoBlock>
      <Menu>
        {sidebarItems.map((elem) => {
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
