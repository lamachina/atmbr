import styled from 'styled-components/macro';

export const Title = styled.h1`
  font-size: 44px;
  font-weight: bold;
  color: ${p => p.theme.text};
  margin: 1rem 0;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;
