import { Logo } from './Logo';
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { useAppGlobalStateSlice } from 'app/slice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ButtonConnected } from '../ButtonConnected';
interface Props {
  primaryAddress?: string;
  activeLink?: string;
}

export function MobileMenu({ activeLink, primaryAddress }: Props) {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = React.useState('');
  const globalSlice = useAppGlobalStateSlice();
  const navigate = useNavigate();
  const [bsCanvas, setBsCanvas]: any = React.useState(undefined);

  function getOffCanvasClassNames(currentLink?: string): string {
    let classes = `nav-link px-2 fw-bold`;
    if (activeLink === currentLink) {
      classes += ' highlight-link-color';
    }
    return classes;
  }

  const onOpenHome = (evt: any) => {
    navigate('/');
  };

  const onOpenSearch = (evt: any) => {
    navigate('/_search');
  };

  const onOpenWallet = (evt: any) => {
    navigate('/_wallet');
  };
  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    var myOffcanvas = document.getElementById('offcanvas');
    if (myOffcanvas && window['bootstrap'] && window['bootstrap']['Offcanvas']) {
      var bsOffcanvas = new window['bootstrap'].Offcanvas(myOffcanvas);
      setBsCanvas(bsOffcanvas);
    }
  });

  const gotoApp = (evt: any) => {
    dispatch(push('/app'));
    evt.preventDefault();
    return false;
  };

  const gotoProfile = (evt: any) => {
    if (primaryAddress) {
      dispatch(push('/_wallet'));
    } else {
      dispatch(push('/connect'));
    }
    evt.preventDefault();
    return false;
  };

  const gotoCreate = (evt: any) => {
    dispatch(push('/create'));
    evt.preventDefault();
    return false;
  };

  const gotoUpload = (evt: any) => {
    dispatch(push('/upload'));
    evt.preventDefault();
    return false;
  };

  const gotoBrowse = (evt: any) => {
    dispatch(push('/browse'));
    evt.preventDefault();
    return false;
  };

  const searchValid = () => {
    if (searchString.length === 64 || searchString.length === 72) {
      return true;
    }
    return false;
  };

  const gotoSearch = evt => {
    if (searchString.length === 64) {
      dispatch(push('/tx/' + searchString));
    }
    if (searchString.length === 72) {
      dispatch(push('/asset/' + searchString));
    }

    evt.preventDefault();
    return false;
  };

  return (
    <Wrapper>
      <MobileHeader className="d-md-none">
        <MobileHeaderRow className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 d-flex hamburger-menu">
            <HomeLink
              onClick={onOpenHome}
              className="d-flex align-items-center mb-lg-0 text-dark text-decoration-none"
            >
              <Logo />
            </HomeLink>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <CursorWrapper>
              <a href="#offcanvas" data-bs-toggle="offcanvas">
                <BarsIcon className="fa fa-bars fa-2x" />
              </a>
            </CursorWrapper>
          </div>
        </MobileHeaderRow>
      </MobileHeader>

      <OffCanvas className="offcanvas offcanvas-end" id="offcanvas">
        <MobileHeader>
          <MobileHeaderRow className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 d-flex justify-content-end">
              <CloseIconWrapper>
                <a href="#offcanvas" data-bs-toggle="offcanvas">
                  <StackIconWrapper className="fa-stack fa-1x">
                    <i className="fa fa-circle-o fa-stack-2x"></i>
                    <i className="fa fa-times fa-stack-1x fa-inverse"></i>
                  </StackIconWrapper>
                </a>
              </CloseIconWrapper>
            </div>
          </MobileHeaderRow>
        </MobileHeader>
        <OffCanvasBody className="offcanvas-body">
          <div className="mt-5"></div>

          {primaryAddress && (
            <ItemButton
              className={getOffCanvasClassNames('app')}
              onClick={gotoApp}
              title="Launch app"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="fa fa-home"></i> My Realms
            </ItemButton>
          )}

          <Item
            className={getOffCanvasClassNames('features')}
            onClick={onOpenSearch}
            href="#features"
            title="Features"
            data-bs-dismiss="offcanvas"
          >
            <i className="fa fa-search"></i> Search
          </Item>

          <Item
            className={getOffCanvasClassNames('company')}
            href="https://docs.atomicals.xyz/realm-names"
            title="Realms Guide"
          >
            Realms Guide
          </Item>

          <ItemButton
            className={getOffCanvasClassNames('connect')}
            title="Wallet"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <ButtonConnected
              primaryAddress={primaryAddress}
              onClick={onOpenWallet}
              data-bs-dismiss="offcanvas"
            />
          </ItemButton>
        </OffCanvasBody>
        <OffCanvasFooter></OffCanvasFooter>
      </OffCanvas>
    </Wrapper>
  );
}

const HomeLink = styled.div`
  cursor: pointer;
`;

const StackIconWrapper = styled.span`
  font-size: 1.3em;
  color: #eee;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SocialLink = styled.a`
  color: rgb(42, 48, 55);
`;

const OffCanvasFooter = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const BarsIcon = styled.i`
  color: #fff;
  cursor: pointer;
`;

const CursorWrapper = styled.div`
  cursor: pointer;
  justify-content: flex-start;
  position: relative;
`;

const CloseIconWrapper = styled.div`
  cursor: pointer;
  justify-content: flex-start;
  position: relative;
  left: -80px;
`;

const OffCanvas = styled.div`
  background-color: #000 !important;
  width: 100%;
  // top: 72px;
`;

const OffCanvasBody = styled.div`
  position: relative;
  padding-top: 90px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MobileHeader = styled.header`
  padding: 1em;
  background-color: #000 !important;
  display: flex;
  position: fixed;
  width: 100%;
  justify-content: center;
  top: 0px;
  z-index: 2;
`;

const MobileHeaderRow = styled.div`
  width: 100%;
`;

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0 ${p => p.theme.borderLight};
  padding-top: 1rem;
  padding-bottom: 1em;
  display: flex;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
`;

const Item = styled.a`
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  font-size: 1.3em;
  text-decoration: uppercase;
  cursor: pointer;
  display: block;
  color: #eee;
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
  margin: 0 auto;
`;

const ItemButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
  font-size: 1.3em;
  text-decoration: uppercase;
  cursor: pointer;
  display: block;
  &:hover {
    text-decoration: underline;
    color: #eee;
  }
  margin: 0 auto;
  // border: solid 2px #eee;
  border-radius: 3px;
`;
