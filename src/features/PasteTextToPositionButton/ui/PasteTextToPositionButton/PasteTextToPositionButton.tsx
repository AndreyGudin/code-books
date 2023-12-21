import type { FC } from 'react';
import { Button, ButtonProps } from '@/shared/ui/redesigned/Button';

interface PasteTextToPositionButtonProps extends ButtonProps {
  position: number;
  value: string;
  textToPaste: string;
  setValue: (value: string) => void;
}

export const PasteTextToPositionButton: FC<PasteTextToPositionButtonProps> = ({
  position,
  value,
  textToPaste,
  setValue,
  children,
  ...otherProps
}: PasteTextToPositionButtonProps) => {
  const handlePasteText = (): void => {
    const result = `${value.substring(
      0,
      position
    )}${textToPaste}${value.substring(position)}`;
    setValue(result);
  };

  return (
    <Button {...otherProps} onClick={handlePasteText}>
      {children}
    </Button>
  );
};
