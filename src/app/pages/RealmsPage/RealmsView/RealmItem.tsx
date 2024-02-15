import { A } from 'app/components/A';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { AtomicalStatus } from 'utils/builder/atomical-status.interface';

interface Props {
  realmInfo: any;
}

const realmLink = (realmName: string) => {
  return `/${realmName}`;
};

export function RealmItem({ realmInfo }: Props) {
  const navigate = useNavigate();

  const onOpenRealm = (evt, name: any) => {
    navigate('/' + name);
    evt.preventDefault();
    return false;
  };

  return (
    <Wrapper>
      <RealmName>
        <A
          href={realmLink(realmInfo.full_realm_name as any)}
          onClick={evt => onOpenRealm(evt, realmInfo.full_realm_name as any)}
        >
          {realmInfo.full_realm_name}
        </A>
      </RealmName>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: ${p => p.theme.text};
`;

const RealmName = styled.div`
  color: ${p => p.theme.text};
  border-top: solid 1px #505050;
  padding: 1em;
`;
