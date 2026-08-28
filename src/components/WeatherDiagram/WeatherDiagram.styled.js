import styled from "styled-components";

export const DiagramSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 18px 42px;
  background: ${({ theme }) => theme.sectionBackground};
`;

export const DiagramTitle = styled.h2`
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0 0 1.5rem 0;
`;

export const ChartContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
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

export const DiagramMessage = styled.div`
  padding: 2rem;
  color: ${({ theme }) => theme.mutedText};
  text-align: center;
`;

export const TooltipBox = styled.div`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.pageBackground};
  color: ${({ theme }) => theme.text};
  font-size: 12px;
`;

export const TooltipTime = styled.p`
  margin: 0;
  font-weight: bold;
`;

export const TooltipTemperature = styled.p`
  margin: 4px 0 0;
  color: #ffa500;
`;
