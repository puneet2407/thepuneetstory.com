import { TopicsPageContent } from "@/components/TopicsPageContent";
import { getAllPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function TopicsPage() {
  const posts = await getAllPosts();

  return <TopicsPageContent posts={posts} />;
}
