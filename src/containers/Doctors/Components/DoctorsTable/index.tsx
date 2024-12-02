import React, { useCallback, useEffect, useState } from 'react';
import Table, { ColumnsType } from 'rc-table';
import DoctorsTableStyle from './DoctorsTable.module.scss';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import docImgPlaceholder from 'assets/images/doc-img-placeholder.png';
import { ActionsType } from 'containers/Doctors/state/actions';
import { useDoctorsContext } from 'containers/Doctors/state';
// api
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { AxiosResponse } from 'axios';
import { userListpUrl } from './constants';
import { User } from './constants';

const DoctorTable: React.FC = () => {
  const {
    state: { showAddDoctorModal = false },
    dispatch,
  } = useDoctorsContext();
  const { callOpenApi } = useOpenApi(onSuccess, onError);
  const [doctors, setDoctors] = useState<User[]>([]);

  useEffect(() => {
    const getList = async () => {
      callOpenApi({ method: 'POST', url: userListpUrl, data: { userType: 'doctor' } });
    };
    if (!showAddDoctorModal) {
      getList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddDoctorModal]);

  function onSuccess(res: AxiosResponse) {
    console.log('success', res);
    if (res.data) {
      setDoctors(res.data.data.users);
    }
  }
  function onError(err: AxiosErrorResponseType) {
    console.log('error', err);
  }

  const doctorDetailsClickHandler = useCallback(
    (rowData: any) => {
      dispatch({ type: ActionsType.TOGGLE_DOCTOR_DETAILS_MODAL });
      dispatch({ type: ActionsType.UPDATE_ACTIVE_USER_ID, payload: rowData?.key });
    },
    [dispatch],
  );

  const columns: ColumnsType<unknown>[] = [
    {
      title: 'SR NO',
      dataIndex: 'srno',
      key: 'srno',
      width: '7%',
      align: 'left',
      className: DoctorsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: DoctorsTableStyle['table-header-cell'] }),
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: '20%',
      className: DoctorsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: DoctorsTableStyle['table-header-cell'] }),
      render: (text, record) => (
        <div className={DoctorsTableStyle['doc-name-cell']}>
          <img src={docImgPlaceholder} alt='doctor-image' />
          <div>
            <div>{text}</div>
            <div className='subtext'>{record.title}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'EXPERIENCE',
      dataIndex: 'experience',
      key: 'experience',
      width: '13%',
      align: 'center',
      className: DoctorsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: DoctorsTableStyle['table-header-cell'] }),
    },
    {
      title: 'CONTACT',
      dataIndex: 'contact',
      key: 'contact',
      align: 'left',
      width: '20%',
      className: DoctorsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: DoctorsTableStyle['table-header-cell'] }),
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div className='subtext'>{record.email}</div>
        </div>
      ),
    },
    {
      title: 'PATIENT HANDLE',
      dataIndex: 'patientHandle',
      key: 'patientHandle',
      width: '20%',
      align: 'center',
      className: DoctorsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: DoctorsTableStyle['table-header-cell'] }),
    },
    {
      title: 'QUERIES HANDLE',
      dataIndex: 'queriesHandle',
      key: 'queriesHandle',
      width: '20%',
      align: 'center',
      className: DoctorsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: DoctorsTableStyle['table-header-cell'] }),
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'actions',
      width: '20%',
      align: 'center',
      className: DoctorsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: DoctorsTableStyle['table-header-cell'] }),
      render: (_: any, record: any) => (
        <IconButton
          aria-label='click'
          className={DoctorsTableStyle['table-action-btn']}
          onClick={() => doctorDetailsClickHandler(record)}
        >
          <ChevronRightIcon style={{ width: '20px', height: '20px' }} />
        </IconButton>
      ),
    },
  ];

  const tableData = doctors
    ? doctors.map((doctor, index) => ({
        key: doctor._id,
        srno: index + 1,
        name: doctor.fullName,
        title: doctor.role,
        avatar: 'path_to_avatar_image',
        experience: doctor.experience || 'N/A',
        contact: doctor.phoneNumber || 'N/A',
        email: doctor.email,
        patientHandle: doctor.patientHandle || 'N/A',
        queriesHandle: doctor.queriesHandle || 'N/A',
      }))
    : [];
  return (
    <>
      <div className={DoctorsTableStyle['doctor-table-container']}>
        <Table
          rowClassName={DoctorsTableStyle['table-row']}
          columns={columns}
          data={tableData}
          rowKey='key'
          className={DoctorsTableStyle['custom-table']}
          rowHoverable={true}
        />
      </div>
    </>
  );
};

export default React.memo(DoctorTable);
