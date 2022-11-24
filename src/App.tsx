import './App.css'
import HomePage from "./pages/home";
import {AppProvider} from "./providers/app-provider";
import {useAdverts} from "./hooks/useAdverts";

function App() {
    const result = useAdverts("lokimo-dataset-backend-test.json");

  return (
      <AppProvider value={result}>
          <div className={"p-8 h-screen"}>
              <HomePage/>
          </div>
      </AppProvider>
  )
}

export default App
