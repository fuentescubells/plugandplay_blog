import { NextRequest, NextResponse } from "next/server";
import { fetchPostsByCategory } from "@/domains/posts/services/post.service";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id || isNaN(Number(id))) {
    return NextResponse.json([], { status: 400 });
  }

  const posts = await fetchPostsByCategory(Number(id), 5);
  return NextResponse.json(posts);
}
