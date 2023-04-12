import logo from './logo.svg';
import './App.css';
import SearchPage from "./pages/Home/SearchPage";
import {QueryClient, QueryClientProvider} from "react-query";

function App() {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <SearchPage/>
            </div>
        </QueryClientProvider>
    );
}

export default App;
