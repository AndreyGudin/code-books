import { useTheme } from "app/providers/ThemeProviders";
import { classNames } from "shared/lib/classNames";
import ThemeIcon from "shared/assets/icons/theme-icon.svg";
import { Button, ThemeButton } from "shared/ui/Button/Button";

import cls from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
    >
      <ThemeIcon className={cls.icon} />
    </Button>
  );
};
