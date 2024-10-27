import { NextRequest, NextResponse } from "next/server";
import { createCanvas } from "canvas";

export async function GET(
  request: NextRequest,
  { params }: { params: { width: string; height: string } }
) {
  const width = parseInt(params.width);
  const height = parseInt(params.height);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#e0e0e0";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#000000";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${width}x${height}`, width / 2, height / 2);

  const buffer = await canvas.toBuffer("image/png");

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Length": buffer.length.toString(),
    },
  });
}
