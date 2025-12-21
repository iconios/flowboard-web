// Component to create a checklist

"use client";

import { CreateChecklistServerAction } from "@/actions/checklist.server.action";
import { ContentSchema, ContentType } from "@/lib/checklist.type";
import NotificationBar from "@/lib/notificationBar";
import { NotificationBarType } from "@/lib/types";
import { Create, Cancel } from "@mui/icons-material";
import { Box, Stack, TextField, Button, useTheme } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormikHelpers, useFormik } from "formik";
import { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

const CreateChecklist = ({
  taskId,
  boardId,
}: {
  taskId: string;
  boardId: string;
}) => {
  // Initialize formik, mutation, and other necessary hooks here
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );
  const theme = useTheme();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-checklist"],
    mutationFn: async (values: {
      content: string;
      taskId: string;
      boardId: string;
    }) => {
      await CreateChecklistServerAction({ ...values });
    },
    onSuccess: async () => {
      // Handle success (e.g., invalidate queries, show notification)
      await queryClient.invalidateQueries({
        queryKey: ["checklists", `checklists:${taskId}`],
      });
    },
    onError: (error) => {
      // Handle error (e.g., show notification)
      console.error("Error creating checklist:", error);
      setNotification({
        message: error instanceof Error ? error.message : String(error),
        messageType: "error",
      });
    },
  });
  const initialValues: ContentType = {
    content: "",
  };

  const handleFormSubmit = async (
    values: ContentType,
    { setSubmitting, resetForm }: FormikHelpers<ContentType>,
  ) => {
    try {
      await mutation.mutateAsync({ ...values, taskId, boardId });
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(ContentSchema),
    onSubmit: handleFormSubmit,
  });

  const bodyStyle = { ...theme.typography.body2 };

  return (
    <Box width="100%">
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <Stack direction="column" spacing={1}>
        <TextField
          type="text"
          label="Add Checklist"
          id="content"
          name="content"
          fullWidth
          size="small"
          slotProps={{
            inputLabel: {
              sx: bodyStyle,
            },
            input: {
              sx: bodyStyle,
            },
          }}
          variant="outlined"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
        />
        <Box>
          <Button
            type="button"
            startIcon={<Create />}
            variant="contained"
            disabled={formik.isSubmitting || !formik.values.content.trim()}
            onClick={() => {
              formik.handleSubmit();
            }}
            sx={{ mr: 2 }}
          >
            Create Checklist
          </Button>
          <Button
            type="reset"
            onClick={() => {
              formik.resetForm();
            }}
            sx={{
              color: "#FF6D00",
              borderColor: "#FF6D00",
              borderWidth: 1,
              borderStyle: "solid",
            }}
            endIcon={<Cancel />}
            variant="outlined"
            disabled={formik.isSubmitting || !formik.values.content.trim()}
          >
            Cancel
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateChecklist;
