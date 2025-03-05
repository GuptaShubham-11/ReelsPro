import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
    request: Request,
    context: { params: { id: string } }
) {
    try {
        await connectToDatabase();
        const { id } = await context.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid or missing video ID" },
                { status: 400 }
            );
        }

        const video = await Video.findById(id).lean();

        if (!video) {
            return NextResponse.json(
                { error: "Video not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(video, { status: 200 });
    } catch (error) {
        console.error("Error fetching video:", error);
        return NextResponse.json(
            { error: "Failed to fetch video" },
            { status: 500 }
        );
    }
}

