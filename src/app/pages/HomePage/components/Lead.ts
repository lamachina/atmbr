import styled from 'styled-components/macro';

export const Lead = styled.p`
  font-size: 26px;
  font-weight: 300;
  line-height: 1.5;
  color: ${p => p.theme.textSecondary};
  margin: 0 0 1.5rem 0;
  strong {
    color: ${p => p.theme.text};
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
