import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Profile } from './Profile';
import { NavBarNew } from 'app/components/NavBarNew';

export function RealmPage() {
  return (
    <>
      <Helmet>
        <title>+bullrun</title>
        <meta name="description" content="+bullrun" />
      </Helmet>
      <NavBarNew />
      <Profile />
    </>
  );
}
