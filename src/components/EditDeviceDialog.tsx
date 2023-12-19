import React, {useState,useEffect} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import { updateDevice } from '../services/device';
import { useSnackbar } from './SnackbarProvier';
interface Props {
    modelOpen: boolean;
    setModelOpen: (open: boolean) => void;
    device:any
}

export default function EditDeviceModel(props: Props) {
    const [tag, setTag] = useState(props.device.tag);
    const showSnackbar = useSnackbar();
    const handleDialogConfirm = async () => {
        props.setModelOpen(false);
        console.log(tag);
        await updateDevice(props.device.id, tag).then((response) => {
            // refresh the page
            window.location.reload();
            showSnackbar('Device Updated', 'success')
        }).catch((error) => {
            console.log(error);
            if (error.message) {
                showSnackbar(error.message, 'error')
            } else {
                showSnackbar('Server Error', 'error')
            }
        });
    }
    useEffect(() => {
        setTag(props.device.tag);
    }, [props.modelOpen]);

    return (
        <>
        <Dialog open={props.modelOpen} onClose={() => props.setModelOpen(false)}>
            <DialogTitle>Edit Device Model</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit the device tag here
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="tag"
                    label="tag"
                    type="text"
                    fullWidth
                    value={tag}
                    onChange={(e) => {setTag(e.target.value)}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setModelOpen(false)}>Cancel</Button>
                <Button disabled={tag.length==0} onClick={handleDialogConfirm}>Save</Button>
            </DialogActions>
            </Dialog>
        </>
    )
}