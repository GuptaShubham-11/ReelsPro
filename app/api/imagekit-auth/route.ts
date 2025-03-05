import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

export async function GET() {
    try {
        const authParams = imagekit.getAuthenticationParameters();
        console.log("auhthhh", authParams);

        return NextResponse.json(authParams);
    } catch (error) {
        console.error("ImageKit Auth Error:", error);  // ✅ Log the exact error
        return NextResponse.json(
            { error: "Failed to get authentication parameters in ImageKit" },
            { status: 500 }
        );
    }
}

