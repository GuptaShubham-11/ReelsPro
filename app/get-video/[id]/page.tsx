'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { X, Heart, MessageSquare, Share2, ThumbsDown } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export default function ShortsVideo() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [videoData, setVideoData] = useState<{ videoUrl: string; title: string; creator: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    console.log(id);


    useEffect(() => {
        async function fetchVideo() {
            try {
                const response = await apiClient.getVideo(id);
                console.log(response);
            } catch (err) {
                setError('Failed to load video.');
            } finally {
                setLoading(false);
            }
        }

        fetchVideo();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

    return (
        <div className="fixed inset-0 bg-black flex justify-center items-center">
            {/* Video Container */}
            <div className="relative w-full h-full max-w-md md:max-w-2xl flex flex-col">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full"
                    onClick={() => router.back()}
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Video */}
                <video
                    className="w-full h-full object-cover"
                    src={videoData?.videoUrl}
                    controls
                    autoPlay
                    loop
                />

                {/* Bottom Text */}
                <div className="absolute bottom-16 left-4 text-white space-y-2">
                    <h2 className="text-lg font-bold">{videoData?.title}</h2>
                    <p className="text-sm opacity-80">@{videoData?.creator}</p>
                </div>

                {/* Right Actions */}
                <div className="absolute bottom-16 right-4 space-y-4">
                    {[
                        { icon: <Heart className="w-6 h-6" />, label: 'Like' },
                        { icon: <ThumbsDown className="w-6 h-6" />, label: 'Dislike' },
                        { icon: <MessageSquare className="w-6 h-6" />, label: 'Comment' },
                        { icon: <Share2 className="w-6 h-6" />, label: 'Share' },
                    ].map((action, index) => (
                        <button key={index} className="flex flex-col items-center text-white">
                            {action.icon}
                            <span className="text-xs">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
