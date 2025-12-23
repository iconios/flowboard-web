// Component for a single checklist item

"use client";

import { UpdateChecklistServerAction } from "@/actions/checklist.server.action";
import { ChecklistType, ContentSchema } from "@/lib/checklist.type";
import NotificationBar from "@/lib/notificationBar";
import { NotificationBarType } from "@/lib/types";
import {
  Checkbox,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Cancel, Save } from "@mui/icons-material";
import { FormikHelpers, useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import DeleteChecklist from "./delete.checklist";

const SingleChecklist = ({ checklist }: { checklist: ChecklistType }) => {
  // Initialize all variables and constants
  const [checked, setChecked] = useState(checklist.checked);
  const [content, setContent] = useState(checklist.content);
  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [notification, setNotification] = useState<NotificationBarType | null>(
    null,
  );

  const handleSaveContent = async (
    values: { content: string },
    { setSubmitting }: FormikHelpers<{ content: string }>,
  ) => {
    try {
      await mutation.mutateAsync({
        checklistId: checklist.id,
        taskId: checklist.taskId,
        content: values.content,
      });
    } catch (error) {
      console.error("Error saving checklist content:", error);
      setNotification({
        messageType: "error",
        message: "Failed to save checklist content. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      content,
    },
    validationSchema: toFormikValidationSchema(ContentSchema),
    enableReinitialize: true,
    onSubmit: handleSaveContent,
  });

  const mutation = useMutation({
    mutationKey: ["updateChecklist", checklist.id],
    mutationFn: async (updateChecklist: {
      content?: string;
      checked?: boolean;
      checklistId: string;
      taskId: string;
    }) => await UpdateChecklistServerAction(updateChecklist),
    onSuccess: (result) => {
      if (result.checklist) {
        setChecked(result.checklist.checked);
        setContent(result.checklist.content);
        formik.resetForm({ values: { content: result.checklist.content } });
      }
    },
    onError: (error) => {
      console.error("Error updating checklist:", error);
      setNotification({
        messageType: "error",
        message: "Failed to update checklist. Please try again.",
      });
    },
  });

  // Check if a specific field is dirty
  const isFieldDirty = (fieldName: "content") => {
    return formik.initialValues[fieldName] !== formik.values[fieldName];
  };

  // Reset a specific field to its initial value
  const resetField = (fieldName: "content") => {
    void formik.setFieldValue(fieldName, formik.initialValues[fieldName]);
    void formik.setFieldTouched(fieldName, false);
  };

  const handleCheckboxToggle = () => {
    setChecked(!checked);
    mutation.mutate({
      checklistId: checklist.id,
      taskId: checklist.taskId,
      checked: !checked,
    });
  };

  return (
    <>
      {notification && (
        <NotificationBar
          message={notification.message}
          messageType={notification.messageType}
        />
      )}
      <ListItem
        sx={{ mb: -2, ml: 0, flex: 1, minWidth: 0 }}
        key={checklist.id}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              setDeleteDialog(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            size="medium"
            slotProps={{
              input: { "aria-label": "controlled" },
            }}
            onChange={handleCheckboxToggle}
          />
        </ListItemIcon>
        <ListItemText sx={{ ml: -2 }}>
          <TextField
            id="checklist-content"
            variant="outlined"
            size="small"
            fullWidth
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {isFieldDirty("content") && (
                      <>
                        <IconButton
                          aria-label="save checklist content"
                          edge="end"
                          size="small"
                          onClick={() => {
                            void formik.submitForm();
                          }}
                          disabled={!isFieldDirty("content")}
                        >
                          <Save fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton
                          aria-label="cancel edit checklist content"
                          edge="end"
                          size="small"
                          onClick={() => {
                            resetField("content");
                          }}
                        >
                          <Cancel fontSize="small" color="error" />
                        </IconButton>
                      </>
                    )}
                  </InputAdornment>
                ),
                style: { fontSize: 16 },
              },
            }}
          />
        </ListItemText>
      </ListItem>
      {openDeleteDialog && (
        <DeleteChecklist
          dialogOpen={openDeleteDialog}
          checklistId={checklist.id}
          taskId={checklist.taskId}
          onClose={() => {
            setDeleteDialog(false);
          }}
        />
      )}
    </>
  );
};

export default SingleChecklist;
