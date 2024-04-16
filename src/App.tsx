import BingoTable from "./components/BingoTable";
import Streak from "./components/StreakAndDate";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <div className="mt-40 container w-3/5 h-auto">
        <Streak/>
        <BingoTable />
      </div>
    </QueryClientProvider>

  );
}

export default App;
