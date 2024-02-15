import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBarNew } from 'app/components/NavBarNew';
import { MintView } from './MintView';
import { useParams } from 'react-router-dom';

export function MintPage() {
  const { name } = useParams();
  return (
    <>
      <Helmet>
        <title>+Realm Names</title>
        <meta name="description" content="Realm name system powered by Bitcoin" />
      </Helmet>
      <NavBarNew />
      <MintView name={name as string} />
    </>
  );
}
