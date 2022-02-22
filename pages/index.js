import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Post from "../components/Post";
import { sortByDate } from "../utils";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Marcus' Blog</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join("posts"));

  //Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    //Create slug
    const slug = filename.replace(".md", "");

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  console.log(posts);

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
