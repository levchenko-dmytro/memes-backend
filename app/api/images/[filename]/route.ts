import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface ParamsInter {
  params: Promise<{ filename: string }>;
}

export async function GET(_req: Request, { params }: ParamsInter) {
  const filename = (await params).filename;
  const filePath = path.join(process.cwd(), "storage", "images", filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
}
