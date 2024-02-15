/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';
import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { RealmPage } from './pages/RealmPage';
import { useAppGlobalStateSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectPrimaryAddress, selectPrimaryPublicKey } from './slice/selectors';
import { ConnectPage } from './pages/ConnectPage';
import { getSubdomainString } from './helpers/getSubdomain';
import { RealmsPage } from './pages/RealmsPage';
import { ClaimPage } from './pages/ClaimPage';
import { MintPage } from './pages/MintPage';

export function App() {
  const { i18n } = useTranslation();
  const { actions } = useAppGlobalStateSlice();
  const dispatch = useDispatch();
  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(effect, []);
  };

  useEffectOnMount(() => {
    // Initialize the cart from the cookie
    dispatch(actions.initSessionFromCookie());
  });
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="+Bullrun"
        defaultTitle="Bullrun"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Bullrun" />
      </Helmet>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/_wallet" element={<ConnectPage />} />
        <Route path="/_realms" element={<RealmsPage />} />
        <Route path="/_search" element={<ClaimPage />} />
        <Route path="/_claim" element={<ClaimPage />} />
        <Route path="/_mint/:name" element={<MintPage />} /> */}
        <Route path="/:name" element={<RealmPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
