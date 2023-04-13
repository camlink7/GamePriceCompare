import logo from './logo.svg';
import './App.css';
import SearchPage from "./pages/Home/SearchPage";
import {QueryClient, QueryClientProvider} from "react-query";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import Footer from "./components/Footer/Footer";

function App() {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <HeaderBar/>
                <div className={"body-content"}>
                    <SearchPage/>
                </div>
                <Footer/>
            </div>
        </QueryClientProvider>
    );
}

export default App;
