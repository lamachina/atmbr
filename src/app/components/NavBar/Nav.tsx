import * as React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as DocumentationIcon } from './assets/documentation-icon.svg';
import { ReactComponent as GithubIcon } from './assets/github-icon.svg';
import { ButtonConnected } from '../ButtonConnected';
import { BigLogo } from '../BigLogo';
import { useAppGlobalStateSlice } from 'app/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectPrimaryAddress, selectPrimaryPublicKey } from 'app/slice/selectors';
import { push } from 'connected-react-router';

export function Nav() {
  const globalSlice = useAppGlobalStateSlice();
  const primaryAddress = useSelector(selectPrimaryAddress);
  const primaryPublicKey = useSelector(selectPrimaryPublicKey);
  const dispatch = useDispatch();

  function onLogout() {
      dispatch(globalSlice.actions.clearSession());
    //  dispatch(push('/connect'));
  }

  function gotoConnect() {
      dispatch(push('/connect'));
 
  }
 
  function isLoggedIn() {
      return primaryAddress;
  }

  const onOpenHome = (evt: any) => {
      dispatch(push('/'));
      evt.preventDefault();
      return false;
  };

  return (
    <Wrapper>
      <header className="py-3 texdt-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
       
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="/" className="nav-link px-2 mx-3 text-secondary">
              
                </a>
              </li>
            </ul>

            <div className="text-end">
              <ButtonConnected primaryAddress={primaryAddress} /> 
            </div>
          </div>
        </div>
      </header>
    </Wrapper>
  );
}

/*

   <Item
        href="https://docs.atomicals.xyz"
        target="_blank"
        title="Documentation Page"
        rel="noopener noreferrer"
      >
        <DocumentationIcon />
        Docs
      </Item>
      <Item
        href="https://github.com/atomicals"
        target="_blank"
        title="Github Page"
        rel="noopener noreferrer"
      >
        <GithubIcon />
        Github
      </Item>
      <ButtonConnected>Connect Wallet</ButtonConnected>*/
const Wrapper = styled.nav``;

const BoldLogo = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

const Item = styled.a`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
