import ShowTask from "@/components/task/showTask";

const TaskPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ taskId: string; listId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const { taskId, listId } = await params;
  const sp = await searchParams;

  const boardId = typeof sp.bId === "string" ? sp.bId : undefined;

  if (!boardId) {
    throw new Error("boardId is required");
  }

  return <ShowTask taskId={taskId} listId={listId} boardId={boardId} />;
};

export default TaskPage;
