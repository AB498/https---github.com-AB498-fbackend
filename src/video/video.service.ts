import { db } from "../utils/db.server";
type Video = {
    title: string;
    ytId: string;
    downloaded: boolean;
    subtitlesAvailable: boolean;
    downloadFile: string;
    subtitleWords: string;
    description: string;
}
export const listVideos = async (): Promise<Video[]> => {
    const videos = await db.video.findMany({
        select: {
            id: true,
            title: true,
            ytId: true,
            downloaded: true,
            subtitlesAvailable: true,
            downloadFile: true,
            subtitleWords: true,
            description: true
        }
    });
    console.log(videos);
    return videos;
}
export const getVideo = async (id: number): Promise<Video | null> => {
    const video = await db.video.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            ytId: true,
            downloaded: true,
            subtitlesAvailable: true,
            downloadFile: true,
            subtitleWords: true,
            description: true
        }
    });
    return video;
}
export const createVideo = async (video: Video): Promise<Video> => {
    const newVideo = await db.video.create({
        data: video
    });
    return newVideo;
}
export const updateVideo = async (id: number, video: Video): Promise<Video | null> => {
    const updatedVideo = await db.video.update({
        where: {
            id: id
        },
        data: video
    });
    return updatedVideo;
}
export const deleteVideo = async (id: number): Promise<Video | null> => {
    const deletedVideo = await db.video.delete({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            ytId: true,
            downloaded: true,
            subtitlesAvailable: true,
            downloadFile: true,
            subtitleWords: true,
            description: true
        }
    });
    return deletedVideo;
}
