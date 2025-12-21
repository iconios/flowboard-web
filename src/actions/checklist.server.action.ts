/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";

import {
  CreateChecklistInputSchema,
  CreateChecklistInputType,
  CreateChecklistServerResponseType,
  DeleteChecklistInputSchema,
  DeleteChecklistInputType,
  DeleteChecklistServerResponseType,
  FetchChecklistsServerResponseType,
  UpdateChecklistInputSchema,
  UpdateChecklistInputType,
  UpdateChecklistServerResponseType,
} from "@/lib/checklist.type";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { ZodError } from "zod";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

const validateServerUrlAndToken = (token: string) => {
  if (!SERVER_BASE_URL) {
    throw new Error("Server Url is required");
  }

  if (!token) {
    throw new Error("Not authenticated");
  }
};

// Create a Checklist for a Task
const CreateChecklistServerAction = async (
  createChecklistInput: CreateChecklistInputType,
) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const { taskId, content, boardId } =
      CreateChecklistInputSchema.parse(createChecklistInput);
    const response = await fetch(
      `${SERVER_BASE_URL}/checklist/task/${taskId}/board/${boardId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      },
    );

    const result: CreateChecklistServerResponseType = await response.json();
    if (process.env.NODE_ENV === "development") {
      console.log("Result from CreateChecklistServerAction", result);
    }

    if (!result.success || !response.ok) {
      throw new Error(result.message || "Request failed");
    }

    revalidateTag("checklists");
    revalidateTag(`checklists:${taskId}`);

    return result.checklist;
  } catch (error) {
    console.error("Error creating checklist", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating create checklist data");
    }

    if (error instanceof Error) throw error;

    throw new Error("Error creating checklist");
  }
};

// Get the Checklists for a Task
const GetChecklistsServerAction = async (taskId: string) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const response = await fetch(
      `${SERVER_BASE_URL}/checklist/task/${taskId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["checklists", `checklists:${taskId}`],
        },
      },
    );

    const result: FetchChecklistsServerResponseType = await response.json();
    if (process.env.NODE_ENV === "development") {
      console.log("Result from GetChecklistsServerAction", result);
    }

    if (!result.success || !response.ok) {
      throw new Error(result.message || "Request failed");
    }

    console.log("Checklists from server", result.data);
    return result.data;
  } catch (error) {
    console.error("Error fetching checklists", error);

    if (error instanceof Error) throw error;

    throw new Error("Error fetching checklist");
  }
};

// Update Checklist on Task
const UpdateChecklistServerAction = async (
  updateChecklistInput: UpdateChecklistInputType,
) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const { taskId, checklistId, ...updateBody } =
      UpdateChecklistInputSchema.parse(updateChecklistInput);
    if (process.env.NODE_ENV === "development") {
      console.log("Update body", updateBody);
      console.log("Checklist ID", checklistId);
      console.log("Task ID", taskId);
    }
    const response = await fetch(
      `${SERVER_BASE_URL}/checklist/${checklistId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateBody),
      },
    );

    const result: UpdateChecklistServerResponseType = await response.json();
    if (process.env.NODE_ENV === "development") {
      console.log("Result from UpdateChecklistServerAction", result);
    }

    if (!result.success || !response.ok) {
      throw new Error(result.message || "Request failed");
    }

    revalidateTag("checklists");
    revalidateTag(`checklists:${taskId}`);

    return {
      success: result.success,
      message: result.message,
      checklist: result.data,
    };
  } catch (error) {
    console.error("Error updating checklist", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating update checklist data");
    }

    if (error instanceof Error) throw error;

    throw new Error("Error updating checklist");
  }
};

// Delete a Checklist from a Task
const DeleteChecklistServerAction = async (
  deleteChecklistInput: DeleteChecklistInputType,
) => {
  const token = (await cookies()).get("token")?.value ?? "";
  validateServerUrlAndToken(token);

  try {
    const { taskId, checklistId } =
      DeleteChecklistInputSchema.parse(deleteChecklistInput);
    const response = await fetch(
      `${SERVER_BASE_URL}/checklist/${checklistId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const result: DeleteChecklistServerResponseType = await response.json();
    if (process.env.NODE_ENV === "development") {
      console.log("Result from DeleteChecklistServerAction", result);
    }

    if (!result.success || !response.ok) {
      throw new Error(result.message || "Request failed");
    }

    revalidateTag("checklists");
    revalidateTag(`checklists:${taskId}`);

    return result.message;
  } catch (error) {
    console.error("Error deleting checklist", error);

    if (error instanceof ZodError) {
      throw new Error("Error validating delete checklist data");
    }

    if (error instanceof Error) throw error;

    throw new Error("Error deleting checklist");
  }
};

export {
  CreateChecklistServerAction,
  GetChecklistsServerAction,
  UpdateChecklistServerAction,
  DeleteChecklistServerAction,
};
