
import Layout from "./Component/Layout";
import Shopping from "./Component/Shopping";
import ShoppingCard from "./Component/ShoppingCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Layout>
    <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/" />
        <Route path="/shopping" element={<Shopping></Shopping>} />
        <Route path="/ShoppingCard" element={<ShoppingCard></ShoppingCard>} />
        
      </Route>
    </Routes>
  </BrowserRouter>
  </Layout>
  );
}

export default App;
