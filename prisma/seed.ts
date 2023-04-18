import { db } from "../src/utils/db.server";

type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

type Video = {
    title: string;
    ytId: string;
    downloaded: boolean;
    subtitlesAvailable: boolean;
    downloadFile: string;
    subtitleWords: string;
    description: string;
}


function getUsers(): Array<User> {
    return [
        {
            firstName: "John",
            lastName: "Doe",
            email: "email1@gmail.com",
            password: "password"
        },
        {
            firstName: "Jane",
            lastName: "Doe",
            email: "email2@gmail.com",
            password: "password"
        }
    ]
}

function getVideos(): Array<Video> {
    return [
        {
            title: "Interstellar",
            ytId: "zSWdZVtXT7E",
            downloaded: false,
            subtitlesAvailable: false,
            downloadFile: "",
            subtitleWords: "",
            description: ""
        },
        {
            title: "The Matrix",
            ytId: "m8e-FF8MsqU",
            downloaded: false,
            subtitlesAvailable: false,
            downloadFile: "",
            subtitleWords: "",
            description: ""
        },
        {
            title: "Inception",
            ytId: "YoHD9XEInc0",
            downloaded: false,
            subtitlesAvailable: false,
            downloadFile: "",
            subtitleWords: "",
            description: ""
        }
    ]
}
async function seed() {
    const users = getUsers();
    const videos = getVideos();

    for (const user of users) {
        await db.user.create({
            data: user
        })
    }

    for (const video of videos) {
        await db.video.create({
            data: video
        })
    }
}
seed();
