import type { FC } from 'react';
import { Flex, type FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack: FC<HStackProps> = (props: HStackProps) => {
  return <Flex direction="row" {...props} />;
};
