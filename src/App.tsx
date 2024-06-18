import React, { useContext, useEffect, useState } from "react";
import NewComer from "./assets/components/NewComer";
import PokeBox from "./assets/components/PokeBox";
import { Store, StoreContext } from "./assets/utils/Store";
import Layout from "./assets/components/Layout";

const App = () => {  
  const { isHaveName } = useContext(StoreContext)

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
