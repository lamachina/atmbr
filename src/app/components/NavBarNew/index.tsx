import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useAppGlobalStateSlice } from 'app/slice';
import { selectPrimaryAddress } from 'app/slice/selectors';
import { ReactComponent as ProfileIcon } from './assets/profile-icon-dark.svg';
import { MobileMenu } from './MobileMenu';
import { Logo } from './Logo';
import { ButtonConnected } from '../ButtonConnected';
import { useNavigate } from 'react-router-dom';
interface Props {
  identityPubKey?: string;
  mode?: string | 'home' | 'dashboard';
}

export function NavBarNew({ mode }: Props) {
  const navMode = !mode ? 'home' : 'dashboard';
  const [searchString, setSearchString] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalSlice = useAppGlobalStateSlice();
  const primaryAddress = useSelector(selectPrimaryAddress);

  function onLogout() {
    dispatch(globalSlice.actions.clearSession());
    //  dispatch(push('/connect'));
  }
  function isLoggedIn() {
    return primaryAddress;
  }

  const onOpenWallet = (evt: any) => {
    navigate('/_wallet');
    evt.preventDefault();
    return false;
  };
  const onOpenHome = (evt: any) => {
    navigate('/');
    evt.preventDefault();
  };

  const onOpenSearch = (evt: any) => {
    navigate('/_search');
    evt.preventDefault();
  };

  const onOpenRealms = (evt: any) => {
    navigate('/_realms');
    evt.preventDefault();
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => { });
  return (
    <>
      <Wrapper className="d-none d-md-block">
        <NavBarHeaderContainer className="container" id="header-container">
          <NavBarHeaderInner className="d-flex">
            <HomeLink
              onClick={onOpenHome}
              className="d-flex align-items-center mb-lg-0 text-dark text-decoration-none"
            >
              <LogoWrapper>
                <Logo />
              </LogoWrapper>
            </HomeLink>

            <NavBarRightItems>

              <Item
                className="nav-link px-2"
                href="#"
                title="FAQ"
                rel="noopener noreferrer"
                onClick={onOpenRealms}
              >
                <i className="fa fa-home"></i> My Realms
              </Item>

              <Item
                className="nav-link px-2"
                href="#"
                title="FAQ"
                rel="noopener noreferrer"
                onClick={onOpenSearch}
              >
                <i className="fa fa-search"></i> Search Realms
              </Item>

              <Item
                className="nav-link px-2"
                href="https://docs.atomicals.xyz/realm-names"
                title="FAQ"
                rel="noopener noreferrer"
              >
                <i className="fa fa-book"></i>&nbsp; Realms Guide
              </Item>

              <ProfileIconContainer className="profile-nav" title="Profile Page">
                <ButtonConnected primaryAddress={primaryAddress} onClick={onOpenWallet} />
              </ProfileIconContainer>
            </NavBarRightItems>
          </NavBarHeaderInner>
        </NavBarHeaderContainer>
      </Wrapper>

      <div className="d-block d-md-none">
        <MobileMenu primaryAddress={primaryAddress} />
      </div>
    </>
  );
}

const SecondaryButton = styled.div`
  background-color: #5c636a;
  color: #eee;
  border: none;
  padding-left: 40px;
  padding-right: 40px;
  &:hover {
    background-color: #53595f;
    color: #eee;
  }
`;

const LogoWrapper = styled.div`
  // background-color: rgba(24,104,183,1);
`;
const NavBarHeaderContainer = styled.div``;

const NavBarHeaderInner = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const NavBarRightItems = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0 ${p => p.theme.borderLight};
  padding-top: 1rem;
  padding-bottom: 1em;
  display: flex;
  position: fixed;
  // border-bottom: solid 1px #eee;
  width: 100%;
  //justify-content: center;
  top: 0;
  background-color: #000;
  z-index: 200000;
  border-bottom: solid;
`;

const HomeLink = styled.div`
  cursor: pointer;
`;

const Item = styled.a`
  padding-left: 2em;
  padding-right: 2em;
  margin-left: 1em;
  margin-right: 1em;
  color: #eee;
  cursor: pointer;
  display: inline-block;
  &:hover {
    color: #eee;
    text-decoration: underline;
  }
  &:active {
    color: #eee;
    text-decoration: underline;
  }
`;

const ProfileIconContainer = styled.div`
  padding-left: 1em;
  cursor: pointer;
`;

const HrDivider = styled.hr`
  margin-left: 1em;
  margin-right: 1em;
  border: 1px solid #eee;
`;

const DropDownListMenu = styled.ul`
  background-color: #fff !important;
  position: relative;
  top: 20px;
  box-shadow: rgba(4, 17, 29, 0.15) 0px 0px 16px 0px;
  // padding-top: 0px;
  // padding-bottom: 0px;
`;

const DropDownListItem = styled.li``;

const DropDownListItemText = styled.a`
  color: #000 !important;

  &:hover {
    background-color: transparent !important;
    color: #004aad !important;
  }
`;
