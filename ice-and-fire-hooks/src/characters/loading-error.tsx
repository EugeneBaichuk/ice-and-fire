import {useState} from "react";
import { Character } from "../types/type";
// хук объединяющий use character и use characters
const useLoadingError = ()=> {
    const [character, setCharacter] = useState<null | Character[]>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    function tryCatch (res: any) {
        try {
          setCharacter(res)
        } catch (e: any) {
          setError(true)
        } finally {
          setLoading(false)
        }
      }
    return {character, loading, setLoading, error, tryCatch}
}

export default useLoadingError;