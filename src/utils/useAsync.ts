// 处理异步请求状态
import { useState } from "react";
import { useMountedRef } from "./index";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const mountedRef = useMountedRef();

  const setData = (data: D) => {
    setState({
      data,
      status: "success",
      error: null,
    });
  };

  const setError = (error: Error) => {
    setState({
      error,
      status: "error",
      data: null,
    });
  };

  // 触发异步函数
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型数据");
    }
    setState({ ...state, status: "loading" });
    return promise
      .then((data) => {
        if (mountedRef.current) {
          setData(data);
        }
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
