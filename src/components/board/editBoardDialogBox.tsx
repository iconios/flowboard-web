import { UpdateBoardServerAction } from "@/actions/boards.server.action";
import NotificationBar from "@/lib/notificationBar";
import {
  EditBoardInputType,
  EditBoardInitialValuesType,
  EditBoardInitialValuesSchema,
  NotificationBarType,
} from "@/lib/types";
import { useUserContext } from "@/lib/user.context";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Stack,
  TextField,
  DialogActions,
  Button,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { useMemo, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Cancel, Edit } from "@mui/icons-material";

const EditBoardDialogBox = ({
  dialogOpen,
  title,
  bg_color,
  boardId,
  onClose,
}: EditBoardInputType) => {
  // Initialize the variables and constants
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );

  const handleDialogClose = () => {
    onClose();
    setNotification(null);
  };

  const initialValues = useMemo(() => {
    return {
      bg_color: bg_color,
      title: title,
    };
  }, [bg_color, title]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: {
      boardId: string;
      values: { title?: string; bg_color?: string };
    }) => UpdateBoardServerAction(payload.boardId, payload.values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["board", user.email],
      });
      setNotification({
        message: "Board edited successfully",
        messageType: "success",
      });
    },
    onError: (error) => {
      setNotification({
        message: error.message || "Failed to edit board",
        messageType: "error",
      });
    },
  });

  const handleEditBoardSubmit = async (
    values: EditBoardInitialValuesType,
    { setSubmitting, resetForm }: FormikHelpers<EditBoardInitialValuesType>,
  ) => {
    console.log(values);
    setNotification(null);
    try {
      await mutateAsync({ boardId, values });
      handleDialogClose();
      resetForm({ values });
    } catch (error: unknown) {
      console.error("Error editing board", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(EditBoardInitialValuesSchema),
    onSubmit: handleEditBoardSubmit,
  });

  return (
    <>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <Dialog
        open={dialogOpen}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        sx={{
          borderRadius: 5,
          px: 1,
          py: 1,
        }}
      >
        <DialogTitle component="h6" sx={{ textAlign: "center" }}>
          Edit Board
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ ...theme.typography.body2, mb: 2 }}>
            Enter the board fields values
          </DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <Stack direction="column" spacing={2}>
              <TextField
                type="text"
                label="Title"
                required
                id="title"
                name="title"
                variant="outlined"
                size="small"
                slotProps={{
                  inputLabel: {
                    sx: {
                      ...theme.typography.body2,
                    },
                  },
                  input: {
                    sx: {
                      ...theme.typography.body2,
                    },
                  },
                }}
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />

              <TextField
                type="color"
                label="Background Color"
                id="bg_color"
                name="bg_color"
                variant="outlined"
                size="small"
                slotProps={{
                  inputLabel: {
                    sx: {
                      ...theme.typography.body2,
                    },
                    shrink: true,
                  },
                  input: {
                    sx: {
                      ...theme.typography.body2,
                    },
                  },
                }}
                value={formik.values.bg_color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.bg_color && Boolean(formik.errors.bg_color)
                }
                helperText={formik.touched.bg_color && formik.errors.bg_color}
              />
            </Stack>

            <DialogActions
              sx={{
                justifyContent: "space-between",
                flexDirection: "row",
                px: 3,
                my: 1,
              }}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={formik.isSubmitting || isPending || !formik.dirty}
                startIcon={<Edit />}
              >
                {formik.isSubmitting ? "Updating..." : "Edit"}
              </Button>
              <Button
                endIcon={<Cancel />}
                sx={{ border: "1px #FF6D00 solid", color: "#FF6D00" }}
                onClick={handleDialogClose}
                disabled={formik.isSubmitting || isPending}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditBoardDialogBox;
