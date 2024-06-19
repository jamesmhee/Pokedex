import NewComer from "./assets/components/NewComer";
import { Store } from "./assets/utils/Store";
import Layout from "./assets/components/Layout";

const App = () => {  
  return (
    <>
      <Layout>
        <Store>
          <NewComer/>
        </Store>
      </Layout>
    </>
  );
};

export default App;
