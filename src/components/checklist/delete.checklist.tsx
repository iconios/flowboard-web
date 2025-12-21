 
 
// Component for deleting a checklist

"use client";

import { DeleteChecklistServerAction } from "@/actions/checklist.server.action";
import NotificationBar from "@/lib/notificationBar";
import theme from "@/lib/theme";
import { NotificationBarType } from "@/lib/types";
import { Delete, Cancel } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SyntheticEvent, useState } from "react";

const DeleteChecklist = ({
  dialogOpen,
  checklistId,
  taskId,
  onClose,
}: {
  dialogOpen: boolean;
  checklistId: string;
  taskId: string;
  onClose: () => void;
}) => {
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const queryClient = useQueryClient();

  const handleDialogClose = () => {
    onClose();
    setNotification(null);
  };

  const mutation = useMutation({
    mutationKey: ["delete-checklist", checklistId],
    mutationFn: async (values: { checklistId: string; taskId: string }) =>
      await DeleteChecklistServerAction(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["checklists", `checklists:${taskId}`],
      });
      handleDialogClose();
    },
    onError: (error) => {
      setNotification({
        message: error instanceof Error ? error.message : String(error),
        messageType: "error",
      });
    },
  });

  const handleDelete = () => {
      console.log("Task Id:", taskId);
      mutation.mutate({ checklistId, taskId });
  };

  return (
    <Box>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="delete-checklist-title"
        aria-describedby="delete-checklist-desc"
        disableEscapeKeyDown={mutation.isPending}
        slotProps={{
          backdrop: {
            onClick: mutation.isPending
              ? (e: SyntheticEvent) => { e.stopPropagation(); }
              : undefined,
          },
        }}
      >
        <DialogTitle component="h6" sx={{ textAlign: "center" }}>
          Delete Checklist
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ ...theme.typography.body2 }}>
            Are you sure you want to delete the checklist?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            flexDirection: "row",
            mb: 2,
            px: 3,
          }}
        >
          <Button
            onClick={handleDelete}
            color="primary"
            variant="contained"
            autoFocus
            disabled={mutation.isPending}
            startIcon={<Delete />}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
          <Button
            onClick={handleDialogClose}
            disabled={mutation.isPending}
            endIcon={<Cancel />}
            sx={{
              color: "#FF6D00",
              borderColor: "#FF6D00",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteChecklist;
