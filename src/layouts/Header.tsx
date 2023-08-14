import React, { useContext, useMemo, useState } from 'react';
import styled from '@emotion/styled';
require('@demox-labs/aleo-wallet-adapter-reactui/styles.css');
import { NavLink } from 'react-router-dom';
import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import { Show } from 'components/Show/Show';
import BurgerSVG from '../assets/svg/burgerMenu.svg';
import WalletSVG from '../assets/svg/wallet.svg';
import AccountSVG from '../assets/svg/profile.svg';
import GamesSVG from '../assets/svg/games.svg';
import VotingSVG from '../assets/svg/voting.svg';
import CloseMenuSVG from '../assets/svg/closeMenu.svg';
import AnsSVG from '../assets/svg/ansLogo.svg';
import TwitterSVG from '../assets/svg/twitter.svg';
import DiscordSVG from '../assets/svg/discord.svg';
import GithubSVG from '../assets/svg/github.svg';
import LogoSVG from '../assets/svg/newLogoMobile.svg';
import WorldSVG from '../assets/svg/world.svg';
import TopArrowSVG from '../assets/svg/topArrow.svg';
import BottomArrowSVG from '../assets/svg/bottomArrow.svg';
import { UserLangContext } from 'App';
import { SuspenseImg } from 'components/SuspenseImg/SuspenseImg';
import { LanguageHOC } from 'hoc/langHoc';

const Container = styled.div(() => ({
  backgroundColor: '#12141C',
  width: '100%',
  height: '90px',
  position: 'fixed',
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: '20px',
  paddingRight: '50px',
  zIndex: 2,
  boxSizing: 'border-box',
  '@media (max-width: 768px)': {
    display: 'none',
  },
}));

const ContainerMobile = styled.div(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    backgroundColor: '#12141C',
    width: '100%',
    height: '50px',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '20px',
    zIndex: 2,
    boxSizing: 'border-box',
  },
}));

const LogoBlock = styled.div(() => ({
  marginRight: 'auto',
  paddingLeft: 20,
  height: '35px',
  '& img': {
    height: '35px',
  },
  // '@media (max-width: 768px)': {
  //   display: 'none',
  // },
}));

const DesktopMessage = styled.div(() => ({
  width: '100px',
  textAlign: 'center',
  fontSize: '12px',
  color: '#F6F6F6',
  padding: '2px 6px',
  border: '1px solid #F6F6F6',
  borderRadius: '4px',
  marginRight: '20px',
}));

const BurgerMenu = styled.img(() => ({
  width: '30px',
  '@media (max-width: 768px)': {},
}));

const CloseMenu = styled.img(() => ({
  width: '20px',
  position: 'absolute',
  top: 30,
  right: 30,
  '@media (max-width: 768px)': {},
}));

const OpenedBurgerMenu = styled.div(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    position: 'fixed',
    width: '100%',
    paddingTop: '100px',
    height: '100%',
    background:
      'linear-gradient(134deg, rgba(0, 0, 0, 0.60) 0%, rgba(17, 16, 97, 0.00) 100%)',
    backdropFilter: 'blur(7.414539337158203px)',
    top: 0,
    left: 0,
    zIndex: 5,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const ItemText = styled.p(() => ({}));

const Item = styled(NavLink)(() => ({
  display: 'flex',
  minWidth: '130px',
  textDecoration: 'none',
  gap: '25px',
  alignItems: 'center',
  color: '#B5B5B5',
  paddingTop: '14px',
  paddingBottom: '14px',
  fontWeight: 600,
  lineHeight: '11px',
  letterSpacing: '-0.415435px',
  paddingLeft: '0px',
  fontSize: '20px',
  marginBottom: '15px',
}));

const ImgBlock = styled.div(() => ({
  width: '35px',
  display: 'flex',
  alignItems: 'center',
}));

const LangBlock = styled.div(() => ({
  width: '50px',
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginRight: '100px',
  color: '#fff',
  '& img': {
    width: '25px',
  },
  '@media (max-width: 768px)': {
    fontSize: '12px',
    gap: '4px',
    marginRight: '45px',
  },
}));

const LangBlockMenu = styled.div(() => ({
  position: 'absolute',
  width: '50px',
  right: '208px',
  top: '38px',
  height: '45px',
  display: 'flex',
  alignItems: 'flex-start',
  marginRight: '100px',
  color: '#A3A3A3',
  '& img': {
    width: '25px',
  },

  '@media (max-width: 768px)': {
    width: '20px',
    top: '19px',
    right: '160px',
  },
}));

const LangItems = styled.div(() => ({
  backgroundColor: '#12141D',
  paddingLeft: '15px',
  paddingBottom: '5px',
  borderRadius: '15px',
  marginTop: '-8px',
  textOverflow: 'ellipsis',
  '& span': {
    '&:hover': {
      color: '#fff',
    },
  },
  '@media (max-width: 768px)': {
    fontSize: '12px',
    paddingLeft: '4px',
    marginTop: '-4px',
  },
}));

const Links = styled.div(() => ({
  marginTop: '100px',
  marginBottom: '150px',
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  '& img': {
    width: '45px',
  },
}));

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

const langs = {
  chi: '中国人',
  eng: 'English',
  ge: 'Deutsch',
  isp: 'Español',
  rb: 'Беларускі',
  ru: 'Русский',
  ua: 'Українська',
};

const WalletMultiButtonStyled = styled(WalletMultiButton)(() => ({}));

//@ts-ignore
export const HeaderPure = (props) => {
  const sidebarItems = [
    {
      label: props.lang.WALLET,
      link: '/wallet',
      icon: WalletSVG,
    },
    {
      label: props.lang.ACC,
      link: '/account',
      icon: AccountSVG,
    },
    {
      label: props.lang.GAME,
      link: '/games',
      icon: GamesSVG,
    },
    {
      label: props.lang.VOTE,
      link: '/voting',
      icon: VotingSVG,
    },
    {
      label: 'ANS',
      link: '/ens',
      icon: AnsSVG,
    },
  ];
  //@ts-ignore
  const { lang, setLang } = useContext(UserLangContext);

  const onHandleClickChange = (value: any) => {
    setLang(value);
    localStorage.setItem('lang', value);
    setShowMenu(false);
  };

  const [isMenuBurgerOpened, setIsMenuBurgerOpened] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Show visible={isMenuBurgerOpened}>
        <OpenedBurgerMenu>
          <CloseMenu
            onClick={() => setIsMenuBurgerOpened(false)}
            src={CloseMenuSVG}
          />
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
          <Links>
            {socialMedias.map((elem) => {
              return (
                <NavLink to={elem.link}>
                  <img src={elem.icon} />
                </NavLink>
              );
            })}
          </Links>
        </OpenedBurgerMenu>
      </Show>
      <ContainerMobile>
        <LogoBlock>
          <NavLink to={'/'}>
            <img src={LogoSVG} />
          </NavLink>
        </LogoBlock>
        <Show visible={!showMenu}>
          <LangBlock
            onClick={() => {
              setShowMenu(true);
            }}
          >
            <img src={WorldSVG} />
            {/*@ts-ignore*/}
            <spa style={{ display: 'flex' }}>{langs[lang]}</spa>
            <img src={TopArrowSVG} />
          </LangBlock>
        </Show>
        <Show visible={showMenu}>
          <LangBlockMenu>
            <img src={WorldSVG} />
            <LangItems>
              <span
                onClick={() => {
                  onHandleClickChange('eng');
                }}
              >
                {' '}
                English <br />
              </span>
              <span
                onClick={() => {
                  onHandleClickChange('ua');
                }}
              >
                {' '}
                Українська
              </span>
              <span
                onClick={() => {
                  onHandleClickChange('ru');
                }}
              >
                {' '}
                Русский
              </span>
              <span
                onClick={() => {
                  onHandleClickChange('rb');
                }}
              >
                {' '}
                Беларускі
              </span>
              <span
                onClick={() => {
                  onHandleClickChange('chi');
                }}
              >
                {' '}
                中国人
              </span>
              <span
                onClick={() => {
                  onHandleClickChange('isp');
                }}
              >
                {' '}
                Español
              </span>
              <span
                onClick={() => {
                  onHandleClickChange('ge');
                }}
              >
                {' '}
                Deutsch
              </span>
            </LangItems>
            <img src={BottomArrowSVG} />
          </LangBlockMenu>
        </Show>
        <DesktopMessage>Desktop Only</DesktopMessage>
        <BurgerMenu
          onClick={() => setIsMenuBurgerOpened(true)}
          src={BurgerSVG}
        />
      </ContainerMobile>
      <Container>
        <Show visible={!showMenu}>
          <LangBlock
            onClick={() => {
              setShowMenu(true);
            }}
          >
            <img src={WorldSVG} />
            {/*@ts-ignore*/}
            <spa style={{ display: 'flex' }}>{langs[lang]}</spa>
            <img src={TopArrowSVG} />
          </LangBlock>
        </Show>
        <Show visible={showMenu}>
          <LangBlockMenu>
            <img src={WorldSVG} />
            <LangItems>
              <span
                onClick={() => {
                  onHandleClickChange('eng');
                }}
              >
                {' '}
                English <br />
              </span>
              <span
                onClick={() => {
                  onHandleClickChange('chi');
                }}
              >
                {' '}
                中国人
              </span>
              <span
                onClick={() => {
                  onHandleClickChange('ge');
                }}
              >
                {' '}
                Deutsch
              </span>
              <span
                onClick={() => {
                  onHandleClickChange('isp');
                }}
              >
                {' '}
                Español
              </span>
              <span
                onClick={() => {
                  onHandleClickChange('ru');
                }}
              >
                {' '}
                Русский
              </span>
              <span
                onClick={() => {
                  onHandleClickChange('ua');
                }}
              >
                {' '}
                Українська
              </span>
              <span
                onClick={() => {
                  onHandleClickChange('rb');
                }}
              >
                {' '}
                Беларускі
              </span>
            </LangItems>
            <img src={BottomArrowSVG} />
          </LangBlockMenu>
        </Show>

        <WalletMultiButton />
      </Container>
    </>
  );
};

export const Header = LanguageHOC(HeaderPure, 'menu');
