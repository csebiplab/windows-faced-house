import { join, extname } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";

// Allowed file types
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/mpeg",
];

// Define a type for the file field from FormData
interface UploadedFile {
  arrayBuffer: () => Promise<ArrayBuffer>;
  name: string;
  type: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as UploadedFile;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // Validate MIME type
    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          error: `Unsupported file type: ${
            file.type
          }. Only images (${ALLOWED_IMAGE_TYPES.join(
            ", "
          )}) and videos (${ALLOWED_VIDEO_TYPES.join(", ")}) are allowed.`,
        },
        { status: 415 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = extname(file.name);
    const relativeUploadDir = `/${new Date()
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;

    const uploadDir = join("/", "uploads", relativeUploadDir);
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const fileUrl = join(relativeUploadDir, fileName);
    const filePath = join(uploadDir, fileName);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error("Error creating upload directory:\n", e);
        return NextResponse.json(
          { error: "Failed to prepare upload directory." },
          { status: 500 }
        );
      }
    }

    await writeFile(filePath, buffer);

    return NextResponse.json(
      {
        name: fileName,
        type: isImage ? "image" : "video",
        url: `/api/uploads${fileUrl}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during file upload:\n", error);
    return NextResponse.json(
      { error: "Something went wrong during upload." },
      { status: 500 }
    );
  }
}
