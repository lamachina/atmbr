import * as React from 'react';
import styled from 'styled-components/macro';

export function FooterBasic() {
  return (
    <Wrapper>
      <Footer className="py-5 my-5">
        <Divider />
        <UL className="nav justify-content-center pb-3 mb-3">
         
          <LI className="nav-item">
            <A href="/" className="nav-link px-2">
              <i className="fa fa-search"></i> Search Realms
            </A>
          </LI>
          <LI className="nav-item">
            <A href="https://docs.atomicals.xyz/realm-names" className="nav-link px-2">
              <i className="fa fa-book"></i> Realms Guide
            </A>
          </LI>
          <LI className="nav-item">
            <A href="https://github.com/atomicals/realm.name" className="nav-link px-2">
              <i className="fa fa-github"></i> Github
            </A>
          </LI>
          <LI className="nav-item">
            <A href="https://x.com/realmname" className="nav-link pxd-2">
              @RealmName
            </A>
          </LI>
        </UL>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: auto;
`;

const A = styled.a`
  color: ${p => p.theme.textSecondary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
    color: ${p => p.theme.textSecondary};
  }

  &:active {
    opacity: 0.4;
    color: ${p => p.theme.textSecondary};
  }
`;

const Divider = styled.div`
  color: ${p => p.theme.text};

  margin-top: 15px;
  margin-bottom: 15px;
`;

const Footer = styled.div`
  color: ${p => p.theme.text};
`;

const UL = styled.ul`
  color: ${p => p.theme.text};
`;

const LI = styled.li`
  color: ${p => p.theme.text};
`;
