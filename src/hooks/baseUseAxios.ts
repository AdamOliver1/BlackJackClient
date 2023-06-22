import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import axiosApi from "./axiosApi";

const useAxios = ( url: string, method: "get" | "post" | "put" | "delete", body: any = {}) => {
  const [data, setData] = useState<any>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cancelToken: CancelTokenSource = axios.CancelToken.source();
    if(url === "") return;
    axiosApi[method](`${url}`, body, { cancelToken: cancelToken.token })
      .then((res) => {
        setIsPending(false);
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setIsPending(false);
        setError(err.message);
      });
    return () => {
      cancelToken.cancel();
    };
  }, [url, method]);
  return { data, isPending, error };
};

export default useAxios;
