// Component to show checklists

import { GetChecklistsServerAction } from "@/actions/checklist.server.action";
import { List, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import SingleChecklist from "./single.checklist";

const ShowChecklists = ({taskId}: {taskId: string}) => {
    const query = useQuery({
        queryKey: ['checklists', taskId],
        queryFn: async () => await GetChecklistsServerAction(taskId),
        enabled: !!taskId,
    });

    const checklists = query.data;

    if (query.isLoading) {
        return <Typography variant="body2" sx={{ fontSize: 14 }}>Loading checklists...</Typography>;
    }

  return (
    <List>
        {checklists && checklists.length > 0 ? (
            checklists.map((checklist) => (
                <SingleChecklist key={checklist.id} checklist={checklist} />
            ))
        ) : (
            <Typography variant="body2" sx={{ fontSize: 14 }}>No checklists found</Typography>
        )}
    </List>
  );
}



export default ShowChecklists;