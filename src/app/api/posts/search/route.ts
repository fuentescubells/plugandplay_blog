import { NextRequest, NextResponse } from "next/server";
import wpApi from "@/shared/lib/wordpress.lib";
import { Post } from "@/domains/posts/models/post.model";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const { data } = await wpApi.get<Post[]>("/posts", {
      params: {
        search: query,
        per_page: 10,
        _embed: "wp:featuredmedia",
      },
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
