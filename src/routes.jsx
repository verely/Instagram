import { PostIndex } from "./pages/PostIndex.jsx"
import { UserProfile } from "./pages/UserProfile.jsx"
import { MessagePage } from "./pages/MessagePage.jsx"
import { PostDetails } from "./cmps/PostDetails.jsx"

// Routes accessible from the main navigation
const routes = [
  {
    path: "/",
    component: <PostIndex />,
    label: "Posts",
  },
  {
    path: "/search",
    component: <PostIndex />,
    label: "Search",
  },
  {
    path: "/explore",
    component: <PostIndex />,
    label: "Explore",
  },
  {
    path: "/message",
    component: <MessagePage />,
    label: "Messages",
  },
  {
    path: "/:userName",
    component: <UserProfile />,
    label: "Profile",
  },
  {
    path: "/more",
    component: <PostIndex />,
    label: "More",
  },
  {
    path: "/p/:id",
    component: <PostDetails />,
    label: "Post Details",
  },
];

export default routes;
