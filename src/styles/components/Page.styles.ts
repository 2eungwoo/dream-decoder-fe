import styled from "styled-components";
import { colors, spacing } from "../theme";

// 페이지 컨테이너 스타일
export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray[50]};
  padding: ${spacing.page} ${spacing.md};

  ${({ theme }) => theme.media.sm} {
    padding: ${spacing.page} ${spacing.lg};
  }

  ${({ theme }) => theme.media.lg} {
    padding: ${spacing.page} ${spacing.xl};
  }
`;

// 페이지 콘텐츠 스타일
export const PageContent = styled.div`
  max-width: 28rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

// 페이지 헤더 스타일
export const PageHeader = styled.div`
  text-align: center;
`;

// 페이지 제목 스타일
export const PageTitle = styled.h2`
  margin-top: ${spacing.xl};
  text-align: center;
  font-size: 1.875rem;
  font-weight: 800;
  color: ${colors.gray[900]};
`;

// 페이지 서브텍스트 스타일
export const PageSubtext = styled.p`
  margin-top: ${spacing.md};
  text-align: center;
  font-size: 0.875rem;
  color: ${colors.gray[600]};
`;

// 페이지 링크 스타일
export const PageLink = styled.a`
  font-weight: 500;
  color: ${colors.primary[600]};
  text-decoration: none;

  &:hover {
    color: ${colors.primary[500]};
  }
`;
