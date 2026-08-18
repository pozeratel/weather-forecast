import styled from "styled-components";

export const DiagramSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 18px 42px;
  background: #ffffff;
`;

export const DiagramTitle = styled.h2`
  width: 100%;
  max-width: 980px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1.5rem 0;
`;

export const ChartContainer = styled.div`
  width: min(100%, 980px);
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 15px;
    width: 100%;
    max-width: 100%;
  }
`;

export const DiagramWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
