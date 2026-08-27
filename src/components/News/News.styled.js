import styled from "styled-components";

export const NewsSection = styled.section`
  width: 100%;
  padding: 18px 16px 36px;
  background: #ffffff;
`;

export const NewsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const NewsHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

export const NewsTitle = styled.h2`
  margin: 0;
  color: #172431;
  font-size: 1rem;
  line-height: 1.2;
`;

export const NewsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const NewsCard = styled.article`
  display: flex;
  min-width: 0;
  flex-direction: column;
`;

export const NewsImage = styled.img`
  width: 100%;
  height: 112px;
  border-radius: 6px;
  object-fit: cover;
  background: #e7ecee;
`;

export const NewsContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 9px 0 0;
`;

export const NewsSource = styled.span`
  display: none;
`;

export const NewsHeadline = styled.h3`
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: #172431;
  font-size: 0.72rem;
  line-height: 1.25;
  font-weight: 500;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const NewsDescription = styled.p`
  display: -webkit-box;
  display: none;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const SeeMoreButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 73px;
  min-height: 22px;
  margin-top: 18px;
  padding: 4px 12px;
  border-radius: 6px;
  background: #ffad68;
  color: #172431;
  font-size: 0.65rem;
  text-decoration: none;

  &:hover {
    background: #f39a50;
  }
`;

export const NewsStatus = styled.p`
  margin: 0;
  padding: 34px 0;
  color: #5c6970;
  font-size: 0.9rem;
  text-align: center;
`;
