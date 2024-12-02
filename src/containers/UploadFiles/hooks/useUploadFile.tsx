/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo } from 'react';
import { useUploadFileContext } from '../state';
import { ActionsType } from '../state/actions';
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { AxiosResponse } from 'axios';
import { fileListUrl } from '../constants';
import get from 'lodash/get';

export function useUploadFile() {
  const {
    state: {},
    dispatch,
  } = useUploadFileContext();

  // File List API Start

  const onFileListSuccess = useCallback((res: AxiosResponse) => {
    console.log('success', res);
    if (res.data) {
      dispatch({
        type: ActionsType.UPLOAD_FILES_LIST,
        payload: get(res, 'data.data', []),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFileListError = useCallback((err: AxiosErrorResponseType) => {
    console.log('error', err);
  }, []);

  const { callOpenApi: fetchFileListApi } = useOpenApi(onFileListSuccess, onFileListError);

  const getFileListApi = useCallback(() => {
    fetchFileListApi({ method: 'GET', url: fileListUrl });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // File List API end

  // File Upload API Start

  const onFileUploadSuccess = useCallback((res: AxiosResponse) => {
    console.log('success', res);
    if (res.data) {
      getFileListApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFileUploadError = useCallback((err: AxiosErrorResponseType) => {
    console.log('error', err);
  }, []);

  const { callOpenApi: fetchFileUploadApi } = useOpenApi(onFileUploadSuccess, onFileUploadError);

  const getFileUploadApi = useCallback((formData: any) => {
    fetchFileUploadApi({
      method: 'POST',
      url: '/api/fileUpload',
      data: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // File Upload API end

  // File Delete/Rename API Start

  const onFileDeleteRenameSuccess = useCallback((res: AxiosResponse) => {
    console.log('success', res);
    if (res.data) {
      getFileListApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFileDeleteRenameError = useCallback((err: AxiosErrorResponseType) => {
    console.log('error', err);
  }, []);

  const { callOpenApi: callFileDeleteRenameApi } = useOpenApi(onFileDeleteRenameSuccess, onFileDeleteRenameError);

  const getFileDeleteRenameApiApi = useCallback(({ method = 'GET', fileId = '' }) => {
    callFileDeleteRenameApi({ method: method, url: `/api/file/${fileId}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // File Delete/Rename API Start

  const changesGridLayoutView = useCallback(() => {
    dispatch({
      type: ActionsType.CHANGE_GRID_LAYOUT,
    });
  }, [dispatch]);

  const setActiveFileId = useCallback(
    (fileId: string) => {
      dispatch({
        type: ActionsType.ACTIVE_FILE_ID,
        payload: fileId,
      });
    },
    [dispatch],
  );

  // Download API Start

  const onDownloadFileSuccess = useCallback((res: AxiosResponse) => {
    console.log('success', res);
    if (res.data) {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.png'); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDownloadFileError = useCallback((err: AxiosErrorResponseType) => {
    console.log('error', err);
  }, []);

  const { callOpenApi: callDownloadFileApi } = useOpenApi(onDownloadFileSuccess, onDownloadFileError);

  const fileDownloadApiCall = useCallback((fileId: string) => {
    callDownloadFileApi({ method: 'GET', url: `/api/file/download/${fileId}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Download file API end

  return useMemo(
    () => ({
      changesGridLayoutView,
      getFileListApi,
      getFileUploadApi,
      getFileDeleteRenameApiApi,
      setActiveFileId,
      fileDownloadApiCall,
    }),
    [
      changesGridLayoutView,
      getFileListApi,
      getFileUploadApi,
      getFileDeleteRenameApiApi,
      setActiveFileId,
      fileDownloadApiCall,
    ],
  );
}
