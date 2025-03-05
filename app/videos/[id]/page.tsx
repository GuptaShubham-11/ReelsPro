import { apiClient } from "@/lib/api-client";

export default async function VideoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id);


    if (!id) {
        return <h1>Video not found</h1>;
    }

    const res = await fetch(`http://localhost:3000/api/videos/${id}`);

    if (!res.ok) {
        return <h1>Video not found</h1>;
    }

    const video = await res.json();
    console.log(video);

    return (
        <div>
            <h1>{video.title}</h1>
            <video controls>
                <source src={video.videoUrl} type="video/mp4" />
            </video>
        </div>
    );
}
