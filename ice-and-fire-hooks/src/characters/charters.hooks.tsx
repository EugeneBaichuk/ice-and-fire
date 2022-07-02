import React, {FC, useEffect, useState} from "react";
import IceandfireApi from "../services/iceandfire";
import useLoadingError from "./loading-error";
import { Character } from "../types/type";

type TFilter = {
    page?: number;
    pageSize?: number;
  }

const useCharters = ({initPage, initPageSize}: {initPage?: number, initPageSize?: number}) => {
    const {character, loading, setLoading, error, tryCatch} = useLoadingError();
   
    const [filter, setFilter] = useState<TFilter>({
        page: initPage,
        pageSize: initPageSize,
    })
    const getCharcters = async () => {
        const value = initPage && initPageSize ? filter : undefined
        setLoading(true)
        const res = await IceandfireApi.getCharacters(value?.page, value?.pageSize)
        tryCatch(res)
    }
    const handlerPage = (type: "left" | "right") => (_e: any) => {
        if (!initPage && !initPageSize) return;
        if (type === "left" && filter?.page && filter?.page > 1) {
          setFilter({ ...filter, page: filter?.page - 1 });
        } else if (filter?.page) setFilter({ ...filter, page: filter?.page + 1 });
      };

    useEffect(() => {
        getCharcters()
    }, [filter.page])

    return {loading, error, character, filter, handlerPage}
}
export {useCharters};