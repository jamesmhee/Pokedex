import React, { useCallback, useEffect, useState } from 'react';
import Layout from './Layout';
import { getFavPokeData } from '../../services/Getdata';
import { PokemonInterface } from '../utils/PokemonInterface';
import Loading from './Loading';
import useModal from '../../hooks/openModal';
import PokemonDetails from './PokemonDetails';

const Profile = () => {
  const currentFavorites = JSON.parse(localStorage.getItem('favorite') || '[]');
  const [favoritePoke, setFavoritePoke] = useState<PokemonInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPokeIndex, setSelectedPokeIndex] = useState<number | null>(null);
  const modal = useModal();
  
  const getFav = useCallback(async () => {
    const favoritePokeData: PokemonInterface[] = [];
    for (let i = 0; i < currentFavorites.length; i++) {
      const getFavorite = await getFavPokeData(currentFavorites[i]);
      favoritePokeData.push(getFavorite);
    }
    
    setFavoritePoke(favoritePokeData);
    setIsLoading(false);
  }, [currentFavorites]);

  useEffect(() => {
    setIsLoading(true);
    getFav();
  }, []);

  const handlePokeClick = (index: number) => {
    setSelectedPokeIndex(index);
    modal.toggle();
  };

  return (
    <div className='w-screen h-screen flex p-5 flex-col bg-slate-800 fixed top-0 left-0 transition-all'>
      <h1 className='rubik text-4xl text-white'>YOUR Favorite Pokemon</h1>
      <div className='flex w-full flex-1 gap-2 flex-wrap overflow-x-hidden overflow-y-auto h-screen flex-row justify-center p-5'>
        {modal.isOpen && selectedPokeIndex !== null ? (
          <PokemonDetails data={favoritePoke[selectedPokeIndex]} toggle={modal.toggle} />
        ) : (
          ''
        )}
        {isLoading ? (
          <Loading />
        ) : (
          favoritePoke?.map((elm: PokemonInterface, index: number) => {
            return (
              <div
                onClick={() => handlePokeClick(index)}
                key={index}
                className='cursor-pointer hover:bg-slate-300 flex-1 items-center bg-zinc-100 rounded-md flex flex-col w-fit h-fit text-white'
              >
                <h1 className='rubik text-black text-2xl'>{elm.name}</h1>
                <img className='w-[200px] h-[200px]' src={elm?.sprites?.front_default}></img>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Profile;
