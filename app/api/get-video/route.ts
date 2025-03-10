import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const { id } = await request.json();

        console.log(id);



        if (!id) {
            return NextResponse.json(
                { error: "Missing videoId" },
                { status: 400 }
            )
        }

        const video = await Video.findById(id).lean();

        if (!video) {
            return NextResponse.json(
                { error: "Video not found" },
                { status: 404 }
            )
        }

        console.log(video);


        return NextResponse.json(video, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch video" },
            { status: 500 }
        );
    }
}