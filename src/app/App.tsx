import "./styles/index.scss";

import { classNames } from "shared/lib/classNames";
import { useTheme } from "app/providers/ThemeProviders";
import { AppRouter } from "app/providers/router";
import { Navbar } from "widgets/Navbar";

const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={classNames("app", {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE</button>
      <Navbar />
      <AppRouter />
    </div>
  );
};

export default App;
