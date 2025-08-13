import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { breakpoints, media } from "./breakpoints";

// styled-components 테마 타입 정의
export interface Theme {
  colors: typeof colors;
  spacing: typeof spacing;
  typography: typeof typography;
  breakpoints: typeof breakpoints;
  media: typeof media;
}

// 테마 객체 생성
export const theme: Theme = {
  colors,
  spacing,
  typography,
  breakpoints,
  media,
};
