import BingoTable from "./components/BingoTable";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mt-14 container w-100% sm:w-3/5 lg:w-4/5">
        <BingoTable />
      </div>
    </QueryClientProvider>
  );
}

export default App;
