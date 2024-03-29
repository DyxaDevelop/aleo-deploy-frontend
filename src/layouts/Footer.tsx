import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
require('@demox-labs/aleo-wallet-adapter-reactui/styles.css');
import { NavLink } from 'react-router-dom';
import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import { Show } from 'components/Show/Show';
import LogoSVG from '../assets/svg/newLogoMobile.svg';
import twitterWhiteSVG from '../assets/svg/twitterWhite.svg';
import discordWhiteSVG from '../assets/svg/discordWhite.svg';
import githubWhiteSVG from '../assets/svg/githubWhite.svg';
import logoSVG from '../assets/svg/LOGO.svg';

const Foooter = styled.div(() => ({
  backgroundColor: '#1E2027',
  height: 400,
  width: '100%',
  marginTop: 250,
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  '@media (max-width: 768px)': {
    display: 'none',
  },
  '& a': {
    textDecoration: 'none',
  },
}));

const FooterLogoBlock = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '21px',
}));

const FooterRightLinks = styled.div(() => ({
  display: 'flex',
  fontWeight: 600,
  gap: '100px',
  fontSize: '16px',
  color: 'rgba(255, 255, 255, 0.5)',
}));

const FooterMobile = styled.div(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    padding: '50px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E2027',
    width: '100%',
    marginTop: 100,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
  },
  '& a': {
    textDecoration: 'none',
  },
}));

const FooterContainerMobile = styled.div(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
}));

const FooterLogo = styled.img(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'block',
    height: '60px',
  },
}));

const FooterItemMobile = styled.div(() => ({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '15px',
    color: '#8E8F93',
    fontWeight: 'bold',
  },
}));

const FooterContainer = styled.div(() => ({
  width: '1000px',
  margin: 'auto',
  paddingTop: '82px',
  display: 'flex',
  justifyContent: 'space-between',
  '@media (max-width: 768px)': {
    width: '100%',
    flexDirection: 'column',
  },
}));

const LinksFooter = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  '@media (max-width: 768px)': {
    '& img': {
      height: '35px',
    },
  },
}));

const BottomFooterText = styled.div(() => ({
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.5)',
  marginTop: '80px',
}));

const FooterRightLinksBlock = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

export const Footer = () => {
  return (
    <>
      <Foooter>
        <FooterContainer>
          <FooterLogoBlock>
            <img style={{ width: 177 }} src={logoSVG} />
            Where Applications
            <br />
            Become Private.
            <LinksFooter>
              <NavLink to="https://twitter.com/aleogameshq">
                <img src={twitterWhiteSVG} />
              </NavLink>
              <a href="https://github.com/AleoHQ">
                <img src={githubWhiteSVG} />
              </a>
              <NavLink to="https://discord.gg/aleohq">
                <img src={discordWhiteSVG} />
              </NavLink>
            </LinksFooter>
            <BottomFooterText>
              © Aleo Systems Inc • Your Privacy is{' '}
              <span style={{ color: '#fff' }}>Protected</span>
            </BottomFooterText>
          </FooterLogoBlock>
          <FooterRightLinks>
            <FooterRightLinksBlock>
              <a href="https://aleo.org" style={{ color: '#fff' }}>
                Aleo.org
              </a>
              <a href="https://aleo.org" style={{ color: '#fff' }}>
                Home
              </a>
              <span>Our Blog</span>
              <span>Opportunities</span>
            </FooterRightLinksBlock>
            <FooterRightLinksBlock>
              <a href="https://developer.aleo.org" style={{ color: '#fff' }}>
                For Developers
              </a>
              <a
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                href="https://aleo.studio"
              >
                Aleo Studio
              </a>
              <a
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                href="https://aleo.network"
              >
                Aleo Explorer
              </a>
              <a
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                href="https://aleo.pm"
              >
                Aleo Package Manager
              </a>
              <a
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                href="https://developer.aleo.org"
              >
                Aleo Developer Docs
              </a>
            </FooterRightLinksBlock>
          </FooterRightLinks>
        </FooterContainer>
      </Foooter>
      <FooterMobile>
        <FooterContainerMobile>
          <FooterItemMobile>
            <span>
              <LinksFooter>
                <NavLink to="https://twitter.com/aleogameshq">
                  <img src={twitterWhiteSVG} />
                </NavLink>
                <a href="https://github.com/AleoHQ">
                  <img src={githubWhiteSVG} />
                </a>
                <NavLink to="https://discord.gg/aleohq">
                  <img src={discordWhiteSVG} />
                </NavLink>
              </LinksFooter>
            </span>
          </FooterItemMobile>
          <FooterItemMobile>
            <a
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              href="https://aleo.org"
            >
              Aleo.org
            </a>
            <a
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              href="https://aleo.org"
            >
              Home
            </a>
            <span>Our Blog</span>
          </FooterItemMobile>
          <FooterItemMobile>
            <a
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              href="https://developer.aleo.org"
            >
              For Developers
            </a>
            <a
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              href="https://aleo.studio"
            >
              Aleo Studio
            </a>
            <a
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              href="https://aleo.network"
            >
              Aleo Explorer
            </a>
            <a
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              href="https://aleo.pm"
            >
              Aleo Package Manager
            </a>
            <a
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              href="https://developer.aleo.org"
            >
              Aleo Developer Docs
            </a>
          </FooterItemMobile>
          <FooterItemMobile>
            <FooterLogo src={LogoSVG} />
          </FooterItemMobile>
        </FooterContainerMobile>
      </FooterMobile>
    </>
  );
};
