import React, { useCallback, useEffect, useState } from 'react';
import Table, { ColumnsType } from 'rc-table';
import PatientsTableStyle from './PatientsTable.module.scss';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import docImgPlaceholder from 'assets/images/doc-img-placeholder.png';
import { ActionsType } from 'containers/Patients/state/actions';
import { usePatientsContext } from 'containers/Patients/state';
import useOpenApi, { AxiosErrorResponseType } from 'hooks/useOpenApi';
import { AxiosResponse } from 'axios';
import { userListpUrl } from './constants';
import { User } from './constants';

const DoctorTable: React.FC = () => {
  const {
    state: { showAddPatientModal = false },
    dispatch,
  } = usePatientsContext();

  const patientDetailsClickHandler = useCallback(
    (rowData: any) => {
      dispatch({ type: ActionsType.TOGGLE_PATIENT_DETAILS_MODAL });
      dispatch({ type: ActionsType.UPDATE_ACTIVE_USER_ID, payload: rowData?.key });
    },
    [dispatch],
  );

  const { callOpenApi } = useOpenApi(onSuccess, onError);
  const [patients, setPatients] = useState<User[]>([]);
  useEffect(() => {
    const getList = async () => {
      callOpenApi({ method: 'POST', url: userListpUrl, data: { userType: 'patient' } });
    };
    if (!showAddPatientModal) {
      getList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddPatientModal]);

  function onSuccess(res: AxiosResponse) {
    console.log('success', res);
    if (res.data) {
      setPatients(res.data.data.users);
    }
  }
  function onError(err: AxiosErrorResponseType) {
    console.log('error', err);
  }

  const columns: ColumnsType<unknown>[] = [
    {
      title: 'SR NO',
      dataIndex: 'srno',
      key: 'srno',
      width: '7%',
      align: 'left',
      className: PatientsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: PatientsTableStyle['table-header-cell'] }),
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: '20%',
      className: PatientsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: PatientsTableStyle['table-header-cell'] }),
      render: (text, record) => (
        <div className={PatientsTableStyle['doc-name-cell']}>
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
      className: PatientsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: PatientsTableStyle['table-header-cell'] }),
    },
    {
      title: 'CONTACT',
      dataIndex: 'contact',
      key: 'contact',
      align: 'left',
      width: '20%',
      className: PatientsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: PatientsTableStyle['table-header-cell'] }),
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
      className: PatientsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: PatientsTableStyle['table-header-cell'] }),
    },
    {
      title: 'QUERIES HANDLE',
      dataIndex: 'queriesHandle',
      key: 'queriesHandle',
      width: '20%',
      align: 'center',
      className: PatientsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: PatientsTableStyle['table-header-cell'] }),
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'actions',
      width: '20%',
      align: 'center',
      className: PatientsTableStyle['table-cell'],
      onHeaderCell: () => ({ className: PatientsTableStyle['table-header-cell'] }),
      render: (_: any, record: any) => (
        <IconButton
          aria-label='click'
          className={PatientsTableStyle['table-action-btn']}
          onClick={() => patientDetailsClickHandler(record)}
        >
          <ChevronRightIcon style={{ width: '20px', height: '20px' }} />
        </IconButton>
      ),
    },
  ];

  const tableData = patients
    ? patients.map((patient, index) => ({
        key: patient._id,
        srno: index + 1,
        name: patient.fullName,
        title: patient.role,
        avatar: 'path_to_avatar_image',
        experience: patient.experience || 'N/A',
        contact: patient.phoneNumber || 'N/A',
        email: patient.email,
        patientHandle: patient.patientHandle || 'N/A',
        queriesHandle: patient.queriesHandle || 'N/A',
      }))
    : [];

  return (
    <>
      <div className={PatientsTableStyle['patient-table-container']}>
        <Table
          rowClassName={PatientsTableStyle['table-row']}
          columns={columns}
          data={tableData}
          rowKey='key'
          className={PatientsTableStyle['custom-table']}
          rowHoverable={true}
        />
      </div>
    </>
  );
};

export default React.memo(DoctorTable);
