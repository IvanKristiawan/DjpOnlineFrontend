import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ButtonGroup,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PanoramaIcon from "@mui/icons-material/Panorama";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ButtonModifier = ({
  id,
  kode,
  addLink,
  editFotoLink,
  editLink,
  approveLink,
  isApprove,
  batalApprove,
  deleteUser,
  nameUser,
}) => {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [openBatalApprove, setOpenBatalApprove] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenBatalApprove = () => {
    setOpenBatalApprove(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseBatalApprove = () => {
    setOpenBatalApprove(false);
  };

  return (
    <>
      <ButtonGroup variant="contained">
        {addLink && (
          <Button
            color="success"
            sx={{ bgcolor: "success.light", textTransform: "none" }}
            startIcon={<AddCircleOutlineIcon />}
            size="small"
            onClick={() => {
              navigate(addLink);
            }}
          >
            Tambah
          </Button>
        )}
        {kode && (
          <>
            {editFotoLink && (
              <Button
                color="warning"
                startIcon={<PanoramaIcon />}
                sx={{ textTransform: "none" }}
                onClick={() => {
                  navigate(editFotoLink);
                }}
              >
                Ubah Foto
              </Button>
            )}
            {editLink && (
              <Button
                color="primary"
                startIcon={<EditIcon />}
                sx={{ textTransform: "none" }}
                onClick={() => {
                  navigate(editLink);
                }}
              >
                Ubah
              </Button>
            )}
            {approveLink &&
              (isApprove ? (
                <Button
                  color="warning"
                  startIcon={<HighlightOffIcon />}
                  sx={{ textTransform: "none" }}
                  onClick={handleClickOpenBatalApprove}
                >
                  Batal Approve
                </Button>
              ) : (
                <Button
                  color="secondary"
                  startIcon={<CheckCircleOutlineIcon />}
                  sx={{ textTransform: "none" }}
                  onClick={() => {
                    navigate(approveLink);
                  }}
                >
                  Approve
                </Button>
              ))}
            <Button
              color="error"
              startIcon={<DeleteOutlineIcon />}
              sx={{ textTransform: "none" }}
              onClick={handleClickOpen}
            >
              Hapus
            </Button>
          </>
        )}
      </ButtonGroup>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Hapus Data`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Yakin ingin menghapus data ${nameUser}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteUser(id)}>Ok</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openBatalApprove}
        onClose={handleCloseBatalApprove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Batal Approve Pembukaan Tabungan Umum`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Yakin ingin batal approve pembukaan tabungan umum ${nameUser}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => batalApprove(id)}>Ok</Button>
          <Button onClick={handleCloseBatalApprove}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ButtonModifier;
