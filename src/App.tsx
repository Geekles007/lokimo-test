import './App.css'
import HomePage from "./pages/home";
import {AppProvider} from "./providers/app-provider";
import {useAdverts} from "./hooks/useAdverts";
import {FilterProvider} from "./providers/filter-provider";
import {useFilter} from "./hooks/useFilter";

function App() {
    const result = useAdverts("lokimo-dataset-backend-test.json");
    const filter = useFilter(result?.all, result.setAdverts);

  return (
      <AppProvider value={result}>
          <FilterProvider value={filter}>
              <div className={"p-2 sm:p-8 h-screen"}>
                  <HomePage/>
              </div>
          </FilterProvider>
      </AppProvider>
  )
}

export default App
