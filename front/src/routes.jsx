import { PostIndex } from "./pages/PostIndex.jsx"
import { UserProfile } from "./pages/UserProfile.jsx"
import { MessagePage } from "./pages/MessagePage.jsx"
import { LoginSignUpPage } from "./pages/LoginSignUpPage.jsx"
import { PostDetailsExtended } from "./cmps/PostDetailsExtended.jsx"
import { SavedPostsExpanded } from "./cmps/SavedPostsExpanded.jsx"
import { ExplorePage } from "./pages/ExplorePage.jsx"

// Routes accessible from the main navigation
const routes = [
  {
    path: "/",
    component: <PostIndex />,
    label: "Posts",
  },
  {
    path: "/login",
    component: <LoginSignUpPage />,
    label: "LoginSignUp",
  },
  {
    path: "/search",
    component: <PostIndex />,
    label: "Search",
  },
  {
    path: "/explore",
    component: <ExplorePage />,
    label: "Explore",
  },
  {
    path: "/message",
    component: <PostIndex />,
    label: "Messages",
  },
  {
    path: "/:userName",
    component: <UserProfile />,
    label: "Profile",
    children: [
      {
        path: "saved/all-posts",
        component: <SavedPostsExpanded />,
        label: "Profile Saved",
      },
    ],
  },
  {
    path: "/more",
    component: <PostIndex />,
    label: "More",
  },
  {
    path: "/p/:id",
    component: <PostDetailsExtended />,
    label: "Post Details",
  },
];

export default routes;
