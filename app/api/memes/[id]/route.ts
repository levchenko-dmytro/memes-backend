import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import memes from "../../../../storage/memes.json" assert { type: "json" };

interface PramsInter {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: PramsInter) {
  if (!params) return;

  const id = parseInt((await params).id);
  const body = await req.json();
  const index = memes.findIndex((m) => m.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  memes[index] = { ...memes[index], ...body };

  const filePath = path.resolve("./storage/memes.json");
  fs.writeFileSync(filePath, JSON.stringify(memes, null, 2));
  return NextResponse.json(memes[index]);
}
