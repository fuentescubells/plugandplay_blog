import { NextRequest, NextResponse } from "next/server";
import wpApi from "@/shared/lib/wordpress.lib";
import { Post } from "@/domains/posts/models/post.model";

const MIN_LENGTH = 2;
const MAX_LENGTH = 100;

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") ?? "";
  const trimmed = query.trim();

  if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
    return NextResponse.json([]);
  }

  try {
    const { data } = await wpApi.get<Post[]>("/posts", {
      params: {
        search: trimmed,
        per_page: 10,
        _embed: "wp:featuredmedia",
      },
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
