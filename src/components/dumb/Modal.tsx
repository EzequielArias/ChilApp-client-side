import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string; // Opcional: título para el modal
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {title}
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};