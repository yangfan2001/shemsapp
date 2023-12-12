import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { useSnackbar } from "../../components/SnackbarProvier";
import { getAllDevices,getAllDeviceModels } from "../../services/device";
import { getCustomerLocation } from "../../services/location";
import { Container, Paper, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddDeviceModal from "./AddDeviceModel";
import DataTable from "../../components/dataTable";


const tableColumns = [
  { field: 'device_id', headerName: 'Device ID', width: 200 },
  { field: 'model_type', headerName: 'Model Type', width: 200 },
  { field: 'model_name', headerName: 'Model Name', width: 400 },
]
export default function MyDevicePage() {
  const showSnackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [deviceModels, setDeviceModels] = useState([]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleAddDevice = async (location_id:string, model_id:string, tag:string) => {
    console.log(location_id, model_id, tag);
  }
  useEffect(() => {
    // declare a function fetchData that is async and calls getAllDevices
    const fetchData = async () => {
      try {
        const [deviceResponse,deviceModelResponse,locationResponse] = await Promise.all([
          getAllDevices(),
          getAllDeviceModels(),
          getCustomerLocation()
      ]);
      setDeviceModels(deviceModelResponse.data);
      setLocations(locationResponse.data);

      } catch (error: any) {
        if (error.message) {
          showSnackbar(error.message, 'error')
        } else {
          showSnackbar('Server Error', 'error')
        }
      } finally{
        setIsLoading(false)
      }
    }
    // call fetchData
    fetchData()
  }, [])
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <Container maxWidth="lg">
      <Paper sx={{ margin: '24px 0', padding: '16px' }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ marginBottom: '0px' }}
          onClick={handleOpenModal}
        >
          Add Device
        </Button>
        <DataTable rows={[]} columns={tableColumns} showSearch={false}/>
      </Paper>
      <AddDeviceModal open={openModal} handleClose={handleCloseModal}  handleAddDevice={handleAddDevice}
      locations={locations} Models={deviceModels}/>
    </Container>
  );
}