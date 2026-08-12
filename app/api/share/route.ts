import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const image = formData.get("image");
    const name =
      String(formData.get("name") || "HH Goa Builder");
    const title =
      String(formData.get("title") || "BUILDER");

    if (!(image instanceof File)) {
      return NextResponse.json(
        {
          error: "No image was received.",
        },
        {
          status: 400,
        }
      );
    }

    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        {
          error: "The uploaded file is not an image.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Create a unique filename.
     */
    const id =
      crypto.randomUUID();

    const pathname =
      `hh-goa/${id}.png`;

    /*
     * Store the generated HH Goa image.
     */
    const blob = await put(
      pathname,
      image,
      {
        access: "public",
        contentType: "image/png",
        addRandomSuffix: false,
      }
    );

    /*
     * Return the public Blob URL.
     */
    return NextResponse.json({
      success: true,
      id,
      url: blob.url,
      name,
      title,
    });
  } catch (error) {
    console.error(
      "HH Goa share generation failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not create share link.",
      },
      {
        status: 500,
      }
    );
  }
}
