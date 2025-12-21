// Component to show checklists
"use client";

import { GetChecklistsServerAction } from "@/actions/checklist.server.action";
import { Box, Container, List, Skeleton, Typography } from "@mui/material";
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
      <Container>
        <Skeleton variant="text" sx={{ fontSize: 32 }} />
        <Skeleton variant="text" sx={{ fontSize: 16 }} />
      </Container>
    );
  }

  return (
    <Box key={taskId}>
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
    </Box>
  );
};

export default ShowChecklists;
