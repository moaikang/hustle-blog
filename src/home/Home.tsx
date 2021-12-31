import React, { ReactElement } from "react";
import Profile from "@home/components/profile";
import Category from "@home/components/category";
import PostList from "./components/post-list/PostList";

const DUMMY = {
  name: "Moai Kang",
  image: "https://avatars.githubusercontent.com/u/52201658?v=4",
  description: "No stack engineer",
  email: "moaikang.dev@gmail.com",
};

function Home(): ReactElement {
  const { name, image, description, email } = DUMMY;

  return (
    <>
      <Profile
        name={name}
        image={image}
        description={description}
        email={email}
      />
      <Category />
      <PostList />
    </>
  );
}
export default Home;
