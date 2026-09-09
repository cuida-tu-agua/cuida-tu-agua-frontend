import { useWindowDimensions } from 'react-native';

type UseResponsiveReturn = {
  isWeb: boolean;
  isMobile: boolean;
  width: number;
  height: number;
};

export const useResponsive = (): UseResponsiveReturn => {
  const { width, height } = useWindowDimensions();

  return {
    isWeb: width > 1065,
    isMobile: width <= 1064,
    width,
    height,
  };
};