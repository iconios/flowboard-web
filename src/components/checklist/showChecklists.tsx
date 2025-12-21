// Component to show checklists
"use client";

import { GetChecklistsServerAction } from "@/actions/checklist.server.action";
import { List, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import SingleChecklist from "./single.checklist";
import CreateChecklist from "./create.checklist";

const ShowChecklists = ({
  taskId,
  boardId,
}: {
  taskId: string;
  boardId: string;
}) => {
  const query = useQuery({
    queryKey: ["checklists", `checklists:${taskId}`],
    queryFn: async () => await GetChecklistsServerAction(taskId),
    enabled: !!taskId,
  });

  const checklists = query.data;

  if (query.isLoading) {
    return (
      <Typography variant="body2" sx={{ fontSize: 14 }}>
        Loading checklists...
      </Typography>
    );
  }

  return (
    <>
      <CreateChecklist taskId={taskId} boardId={boardId} />
      <List>
        {checklists && checklists.length > 0 ? (
          checklists.map((checklist) => (
            <SingleChecklist key={checklist.id} checklist={checklist} />
          ))
        ) : (
          <Typography variant="body2" sx={{ fontSize: 14 }}>
            No checklists found
          </Typography>
        )}
      </List>
    </>
  );
};

export default ShowChecklists;
