import { z } from "zod";

export const CreateChecklistInputSchema = z.object({
  content: z.string().max(255),
  taskId: z.string(),
  boardId: z.string(),
});

export type CreateChecklistInputType = z.infer<
  typeof CreateChecklistInputSchema
>;

export const CreateChecklistServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  checklist: z.object({
    id: z.string(),
    taskId: z.string(),
    userId: z.string(),
    boardId: z.string(),
    content: z.string().max(255),
    checked: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type CreateChecklistServerResponseType = z.infer<
  typeof CreateChecklistServerResponseSchema
>;

export const FetchChecklistsServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      taskId: z.string(),
      user: z.object({
        email: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        id: z.string(),
      }),
      content: z.string(),
      boardId: z.string(),
      checked: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  ),
  error: z
    .object({
      code: z.string(),
      details: z.string(),
    })
    .nullable(),
  metadata: z.object({
    timestamp: z.string(),
    taskId: z.string(),
    userId: z.string(),
    count: z.number().optional(),
  }),
});

export type FetchChecklistsServerResponseType = z.infer<
  typeof FetchChecklistsServerResponseSchema
>;

export const UpdateChecklistInputSchema = z.object({
  taskId: z.string(),
  checklistId: z.string(),
  content: z.string().max(255).optional(),
  checked: z.boolean().optional(),
});

export type UpdateChecklistInputType = z.infer<
  typeof UpdateChecklistInputSchema
>;

export const UpdateChecklistServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z
    .object({
      id: z.string(),
      taskId: z.string(),
      userId: z.string(),
      boardId: z.string(),
      content: z.string(),
      checked: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
    .nullable(),
  error: z
    .object({
      code: z.string(),
      details: z.string(),
    })
    .nullable(),
  metadata: z.object({
    timestamp: z.string(),
    taskId: z.string().optional(),
    userId: z.string().optional(),
    boardId: z.string().optional(),
    checklistId: z.string().optional(),
  }),
});

export type UpdateChecklistServerResponseType = z.infer<
  typeof UpdateChecklistServerResponseSchema
>;

export const DeleteChecklistInputSchema = z.object({
  taskId: z.string(),
  checklistId: z.string(),
});

export type DeleteChecklistInputType = z.infer<
  typeof DeleteChecklistInputSchema
>;

export const DeleteChecklistServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({}).nullable(),
  error: z
    .object({
      code: z.string(),
      details: z.string(),
    })
    .nullable(),
  metadata: z.object({
    timestamp: z.string(),
    userId: z.string().optional(),
    checklistId: z.string().optional(),
    boardId: z.string().optional(),
    deletedCount: z.number().optional(),
  }),
});

export type DeleteChecklistServerResponseType = z.infer<
  typeof DeleteChecklistServerResponseSchema
>;

export const ChecklistSchema = z.object({
  id: z.string(),
  taskId: z.string(),
  user: z.object({
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    id: z.string(),
  }),
  boardId: z.string(),
  content: z.string().max(255),
  checked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ChecklistType = z.infer<typeof ChecklistSchema>;

export const ContentSchema = z.object({
  content: z.preprocess((val) => val ?? "", z
    .string()
    .min(1, "Content is required")
    .max(255, "Content is too long"),)
});

export type ContentType = z.infer<typeof ContentSchema>;
