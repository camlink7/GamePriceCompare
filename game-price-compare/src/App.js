import logo from './logo.svg';
import './App.css';
import SearchPage from "./pages/Home/SearchPage";
import {QueryClient, QueryClientProvider} from "react-query";
import HeaderBar from "./components/HeaderBar/HeaderBar";

function App() {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <HeaderBar/>
                <SearchPage/>
            </div>
        </QueryClientProvider>
    );
}

export default App;
