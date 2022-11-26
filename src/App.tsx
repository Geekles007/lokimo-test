import './App.css'
import HomePage from "./pages/home";
import DetailsModal from "./components/details-modal";

function App() {

    return (
        <div className={"p-2 lg:p-8 h-screen"}>
            <HomePage/>
            <DetailsModal/>
        </div>
    )
}

export default App
