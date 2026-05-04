
import { fetchCategories } from "@/domains/categories/services/categorie.service";

async function getPosts() {
  const res = await fetchCategories()
  return res;
}

export default async function Home() {
  const posts = await getPosts();
  console.log(posts)
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        
      </ul>
    </main>
  );
}
