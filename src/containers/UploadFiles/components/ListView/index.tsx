/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';
import Table, { ColumnsType } from 'rc-table';
import ListViewStyles from './ListView.module.scss';
import IconButton from '@mui/material/IconButton';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; // Import the icon
// API and constants
import FileMoreOptionsMenu from '../FileMoreOptionsMenu';
import { useUploadFileContext } from 'containers/UploadFiles/state';
import { useUploadFile } from 'containers/UploadFiles/hooks/useUploadFile';

const ListView: React.FC = () => {
  const {
    state: { uploadFileList = [] },
  } = useUploadFileContext();

  const { setActiveFileId } = useUploadFile();

  const fileDetailsClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.stopPropagation();
    // Add logic to handle file details click event (e.g., open a modal)
  };

  const columns: ColumnsType<unknown>[] = [
    {
      title: 'File Name',
      dataIndex: 'fileName',
      key: 'fileName',
      className: ListViewStyles['fileNameColumn'],
      render: (text) => (
        <div className={ListViewStyles['file-name-cell']}>
          <InsertDriveFileIcon className={ListViewStyles['file-icon']} />
          {text}
        </div>
      ),
    },
    {
      title: 'Uploaded Date',
      dataIndex: 'uploadedDate',
      key: 'uploadedDate',
      className: ListViewStyles['uploadedDateColumn'],
    },
    {
      title: 'File Size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      className: ListViewStyles['fileSizeColumn'],
    },
    {
      title: '',
      key: 'actions',
      className: ListViewStyles['actionsColumn'],
      render: (_: any, record: any) => {
        return (
          <IconButton
            aria-label='click'
            className={ListViewStyles['table-action-btn']}
            onClick={fileDetailsClickHandler}
          >
            <FileMoreOptionsMenu fileId={record._id} />
          </IconButton>
        );
      },
    },
  ];

  const tableData = useMemo(
    () =>
      uploadFileList?.map((file) => ({
        _id: file._id,
        fileName: file.file_name,
        uploadedDate: file.createdAt,
        modifiedAt: file.modifiedAt,
        filePath: file.file_path,
        fileSize: file.fileSize,
      })),
    [uploadFileList],
  );

  return (
    <div className={ListViewStyles['file-table-container']}>
      <Table
        rowClassName={ListViewStyles['table-row']}
        columns={columns}
        data={tableData}
        rowKey='key'
        className={ListViewStyles['custom-table']}
        rowHoverable={true}
        onRow={(record) => ({
          onClick: () => {
            setActiveFileId(record._id);
          },
        })}
      />
    </div>
  );
};

export default React.memo(ListView);
