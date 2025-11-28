import Mainroutes from "./routes/Mainroutes";
import { ThemeProvider, useTheme } from "./ThemeContext";

const AppContent = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={
        isDark ? "bg-[#050816] min-h-screen" : "bg-gray-100 min-h-screen"
      }
    >
      <Mainroutes />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
