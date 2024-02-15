import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { HomeView } from './HomeView';
import { FooterBasic } from 'app/components/FooterBasic';
import { NavBarNew } from 'app/components/NavBarNew';

export function HomePage() {
  return (
    <>
    <Helmet>
        <title>+bullrun</title>
        <meta name="description" content="+bullrun" />
      </Helmet>
      <NavBarNew />
      <div>
        <HomeView />
        <FooterBasic />
      </div>
    </>
  );
}
