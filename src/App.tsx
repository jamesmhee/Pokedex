import React, { useState } from 'react';
import NewComer from './assets/components/NewComer';
import PokeBox from './assets/components/PokeBox';
// import { useExampleContext } from './assets/utils/Store';

const App = () => {  
  const [ displayName, setDisplayName ] = useState<string>('')
  const [ haveName, setHaveName ] = useState<boolean>(false)

  return (
    <>
      <div className='flex w-screen h-screen justify-center items-center bg-home'>
        {
          !haveName ? (<NewComer setDisplayName={setDisplayName} displayName={displayName} setHaveName={setHaveName}/>) : (<PokeBox displayName={displayName}/>)
        }        
      </div>
    </>
  );
};

export default App;