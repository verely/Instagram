import { PostIndex } from "./pages/PostIndex.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";
import { MessagePage } from "./pages/MessagePage.jsx";

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: "/",
    component: <PostIndex />,
    label: "Posts",
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
];

export default routes;
