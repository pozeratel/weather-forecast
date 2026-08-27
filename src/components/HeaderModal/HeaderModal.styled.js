import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.65);
  z-index: 1000;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 0.25s ease, visibility 0.25s ease;
`;

export const ModalCard = styled.div`
  position: relative;
  width: min(100%, 440px);
  padding: 32px;
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.25);
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)"};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: transform 0.25s ease, opacity 0.25s ease;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  border: none;
  background: transparent;
  font-size: 28px;
  color: #64748b;
  cursor: pointer;
`;

export const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 28px;
  color: #0f172a;
`;

export const Subtitle = styled.p`
  margin: 0 0 24px;
  color: #64748b;
  font-size: 15px;
`;

export const Form = styled.form`
  display: grid;
  gap: 16px;
`;

export const Field = styled.label`
  display: grid;
  gap: 8px;
  color: #334155;
  font-size: 14px;
  font-weight: 600;
`;

export const ErrorText = styled.span`
  color: #dc2626;
  font-size: 13px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

export const CheckboxField = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #475569;
  font-size: 14px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 13px 16px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px rgba(37, 99, 235, 0.25);
  }
`;
