import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  max-width: 448px;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 704px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;
