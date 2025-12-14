/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

const TimelineItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  isLast: z.boolean().optional(),
  img: z.object({
    src: z.string(),
    alt: z.string(),
  }),
});

export type TimelineItemType = z.infer<typeof TimelineItemSchema>;
