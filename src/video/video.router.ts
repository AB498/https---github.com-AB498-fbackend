import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as VideoService from './video.service';

export const videoRouter = express.Router();

videoRouter.get('/', async (req: Request, res: Response) => {
    try {
        const videos = await VideoService.listVideos();
        res.status(200).send(videos);
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
}
);
videoRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const video = await VideoService.getVideo(parseInt(req.params.id));
        if (video) {
            res.status(200).send(video);
        }
        else {
            res.status(404).send('Video not found');
        }
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
}
);

videoRouter.post('/', [
    body('title').isString(),
    body('ytId').isString(),
    body('downloaded').isBoolean(),
    body('subtitlesAvailable').isBoolean(),
    body('downloadFile').isString(),
    body('subtitleWords').isString(),
    body('description').isString()
], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const video = await VideoService.createVideo(req.body);
        res.status(201).send(video);
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
}
);

videoRouter.put('/:id', [
    body('title').isString(),
    body('ytId').isString(),
    body('downloaded').isBoolean(),
    body('subtitlesAvailable').isBoolean(),
    body('downloadFile').isString(),
    body('subtitleWords').isString(),
    body('description').isString()
], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const video = await VideoService.updateVideo(parseInt(req.params.id), req.body);
        if (video) {
            res.status(200).send(video);
        }
        else {
            res.status(404).send('Video not found');
        }
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
}


);

videoRouter.delete('/:id', async (req: Request, res: Response) => {

    try {
        const video = await VideoService.deleteVideo(parseInt(req.params.id));
        if (video) {
            res.status(200).send(video);
        }
        else {
            res.status(404).send('Video not found');
        }
    }
    catch (e: any) {
        res.status(500).send(e.message);
    }
}
);


