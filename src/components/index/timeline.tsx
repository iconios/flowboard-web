"use client";

import { Box } from "@mui/material";
import EvenTimelineItem from "./even-timelineItem";
import OddTimelineItem from "./odd-timelineItem";

const Timelines = () => {
  const items = [
    {
      id: "1",
      title: "One App for All Your Devices",
      description:
        "Tired of apps that only work well on one platform? Our app gives you the same powerful, intuitive experience whether you're on iPhone, Android, Windows, Mac, or the web. Your projects sync instantly, so you can pick up right where you left off—no matter what device you're using.",
      img: {
        src: "/cross-platform.png",
        alt: "Cross-platform",
      },
    },
    {
      id: "2",
      title: "Different Devices, One Team. Finally",
      description:
        "When Sarah updates a deadline on her Mac in San Francisco, Mark sees it immediately on his Android in London, and the entire team's timelines adjust automatically. No confusion. No sync delays. No page refresh. Our visual workspace isn't just another app—it's your team's shared brain. Track projects through intuitive timelines, kanban boards, and calendars that everyone can access and edit from any device. Stop describing. Start showing. With visual collaboration that actually works for everyone on your team.",
      img: {
        src: "/team-collaboration.png",
        alt: "Team Collaboration",
      },
    },
    {
      id: "3",
      title:
        "From Overwhelmed to Overachieving: Your Personal Command Center for Life",
      description:
        "Does your brain feel like a browser with too many tabs open? Work tasks, personal projects, household chores, health goals, and family commitments all competing for attention? Meet your new personal productivity hub—the first workspace designed to bring harmony to your entire life, not just your work.",
      img: {
        src: "/personal-devt.png",
        alt: "Personal Tasks",
      },
    },
    {
      id: "4",
      title: "See Your Sprint Flow, Not Just Your Tasks",
      description:
        "Imagine this: Your entire sprint workflow—from that initial backlog idea to the final 'Done' column—laid out in one beautiful, intuitive visual space. Not as separate lists or disconnected boards, but as a cohesive flow that your whole team can see and interact with simultaneously. That’s sprint agility made visible.",
      img: {
        src: "/agile-sprint.png",
        alt: "Agile Sprint",
      },
    },
    {
      id: "5",
      title: "Project clarity shouldn't require a PhD in organization",
      description:
        "Most project tools add complexity. We add clarity. Transform overwhelm into organized action with intuitive visual planning that shows you—at a glance—exactly what needs attention, who's responsible, and what's coming next. No more guessing. No more missed steps.",
      img: {
        src: "/professional-devt.png",
        alt: "Project Management",
      },
    },
  ];

  // const timelineStyle: CSSProperties = {
  //   marginBottom: 2,
  //   backgroundColor: theme.palette.secondary.main,
  //   padding: 2,
  //   listStyle: "none"
  // }
  return (
    <Box>
      {items.map((item, index) =>
        index % 2 === 0 ? (
          <EvenTimelineItem
            title={item.title}
            description={item.description}
            img={item.img}
            key={item.id}
            isLast={index === items.length - 1}
          />
        ) : (
          <OddTimelineItem
            title={item.title}
            description={item.description}
            img={item.img}
            key={item.id}
            isLast={index === items.length - 1}
          />
        ),
      )}
    </Box>
  );
};

export default Timelines;
