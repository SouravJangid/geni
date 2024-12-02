import axios, { AxiosError, AxiosResponse } from 'axios';
import { useBusinessContext } from 'context/BusinessContext';
import { useCallback, useMemo, useState } from 'react';
import { Routes, ROUTES_ENUM } from 'constants/routes';
import { useHistory } from 'react-router-dom';
interface AxiosResponseWithError extends AxiosResponse {
  isAxiosError?: boolean;
  response?: AxiosResponse;
}

interface ParamType {
  method?: string;
  data?: any;
  url: string;
  headers?: any;
}

type AxiosErrorResponseType = AxiosError | AxiosResponseWithError;

function useOpenApi(
  successCb?: (res: AxiosResponse) => void,
  errorCb?: (error: AxiosErrorResponseType) => void,
): {
  data: AxiosResponse;
  loading: boolean;
  error: AxiosErrorResponseType;
  callOpenApi: (params: ParamType) => void;
} {
  const [data, setData] = useState<AxiosResponse>(null as unknown as AxiosResponse);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({} as AxiosErrorResponseType);
  const { setUser } = useBusinessContext() as any;
  const history = useHistory();

  const callOpenApi = useCallback(
    ({ method, url, headers = {}, data = {} }: ParamType) => {
      setLoading(true);
      try {
        axios({ method: method || 'GET', url, data, headers })
          .then((response) => {
            if (axios.isAxiosError(response)) {
              // axios sends nested response when isAxiosError is true
              const errorData = response.response;
              setError(errorData as AxiosErrorResponseType);
              if (errorCb) errorCb(errorData as AxiosErrorResponseType);
            } else {
              setData(response as AxiosResponse);
              if (successCb) successCb(response as AxiosResponse);
            }
          })
          .catch((error: AxiosError) => {
            const status = error.response?.status;

            // // Log detailed error information
            // console.log('Main 1 error:', axiosError); // Logs the full Axios error object
            // console.log('Response data:', axiosError.response?.data); // Logs the error response data if available
            // console.log('Response status:', status); // Logs the error status if available

            // Log the error status if available
            if (status) {
              setUser({});
              history.push(Routes[ROUTES_ENUM.LOGIN]);
            }
            setError(error as AxiosErrorResponseType);
            if (errorCb) errorCb(error as AxiosErrorResponseType);
          });
      } catch (error) {
        // const err = error as AxiosErrorResponseType;
        // console.log('error in 2main: ' + err.response);
        setError(error as AxiosErrorResponseType);
        if (errorCb) errorCb(error as AxiosErrorResponseType);
      } finally {
        setLoading(false);
      }
    },
    [errorCb, successCb, setUser, history],
  );

  return useMemo(() => ({ data, loading, error, callOpenApi }), [callOpenApi, data, error, loading]);
}
export default useOpenApi;
export { AxiosErrorResponseType };
