import IceandfireApi from "../services/iceandfire";
import useLoadingError from "./loading-error";
//кастомный хук для отрисовки персонажа
const useCharacter = (handleModalMemorized: Function, ) => {
  const {character, loading, setLoading, error, tryCatch} = useLoadingError();  
  const handlerClickCharacter = (url: string) => {
    return async() => {
      setLoading(true)
      const res = await IceandfireApi.getCharterInfo(url)
      handleModalMemorized(true)()
      tryCatch(res);
    }
  }  
  return {character, loading, error, handlerClickCharacter};
}

export default useCharacter;