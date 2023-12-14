import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { useSnackbar } from '../../components/SnackbarProvier';



const genLocationName = (location_steet_num: Number, location_street_name: string, location_unit_number:string, location_id:string) => {
  return `location ${location_id}:`+location_steet_num + " " + location_street_name + " " + location_unit_number;
}

interface AddDeviceModalProps {
    open: boolean;
    handleClose: () => void;
    handleAddDevice: (locationId: string, modelId: string, tag: string) => void;
    locations: Location[];
    Models: Model[];
}

// Define types for your location and model objects as they should appear
interface Location {
    location_id: string;
    location_street_num: Number;
    location_street_name: string;
    location_unit_number:string;
    // ... other location properties
}

interface Model {
    model_id: string;
    model_name: string;
    model_type: string;
    // ... other model properties
}

const modalStyle = {
  position: 'absolute' as 'absolute', // TypeScript needs 'as' assertion for 'absolute'
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


export default function AddDeviceModal({ open, handleClose, handleAddDevice, locations, Models }: AddDeviceModalProps) {
  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [tag, setTag] = useState('');
  const [errors, setErrors] = useState({
    location: false,
    model: false,
    tag: false
  });

  const showSnackbar = useSnackbar();

  const validateForm = () => {
    const newErrors = {
      location: !selectedLocationId,
      model: !selectedModelId,
      tag: !tag
    };
    
    setErrors(newErrors);
    return !newErrors.location && !newErrors.model && !newErrors.tag;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      handleAddDevice(selectedLocationId, selectedModelId, tag);
      handleClose();
    } else {
      showSnackbar('Please fill in all required fields.', 'error');
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setErrors({ location: false, model: false, tag: false }); // Reset errors on close
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={modalStyle} noValidate onSubmit={onSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Device
        </Typography>
        <FormControl fullWidth margin="normal" error={errors.location} required>
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            labelId="location-select-label"
            id="location-select"
            value={selectedLocationId}
            label="Location"
            onChange={(e) => setSelectedLocationId(e.target.value as string)}
          >
            {locations.map((location) => (
              <MenuItem value={location.location_id} key={location.location_id}>
                {genLocationName(location.location_street_num, location.location_street_name, location.location_unit_number, location.location_id)}
              </MenuItem>
            ))}
            {(locations.length === 0) && (
              <MenuItem disabled>
                No locations available - please add a location first.
              </MenuItem>
            )}
          </Select>
          {errors.location && <FormHelperText>Location is required.</FormHelperText>}
        </FormControl>
        <FormControl fullWidth margin="normal" error={errors.model} required>
          <InputLabel id="model-select-label">Model</InputLabel>
          <Select
            labelId="model-select-label"
            id="model-select"
            value={selectedModelId}
            label="Model"
            onChange={(e) => setSelectedModelId(e.target.value as string)}
          >
              {
                Models.map((model) => {
                return <MenuItem value={model.model_id} key={model.model_id}>
                    {model.model_type}:{model.model_name}
                    </MenuItem>
                })
           }        
          </Select>
          {errors.model && <FormHelperText>Model is required.</FormHelperText>}
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="tag"
          label="Tag"
          name="tag"
          autoComplete="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          error={errors.tag}
          helperText={errors.tag ? 'Tag is required.' : ''}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Device
        </Button>
      </Box>
    </Modal>
  );
}
