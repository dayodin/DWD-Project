import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";

import { ShareProvider } from "../ShareProvider";

export function registerShareRoutes(app: express.Application, mongoClient: MongoClient) {

    app.get("/share/:user", async (req, res) => {

        console.log("hi")
        const username = req.params.user;
    
        try {
            const shareProvider = new ShareProvider(mongoClient)
            const sharedManga = await shareProvider.getShared(username)

            res.status(200).json(sharedManga);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    })

    app.post("/share", async (req, res) => {

        const { username, url, series, vol } = req.body;
    
        try {
            const shareProvider = new ShareProvider(mongoClient)
            const sharedManga = await shareProvider.postNewShared(username, url, series, vol)

            res.json(sharedManga);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    })

    app.get("/share", async (req, res) => {

        console.log("hello")
        // const username = req.params.user;
    
        try {
            const shareProvider = new ShareProvider(mongoClient)
            const users = await shareProvider.getUsers()

            console.log(users);

            res.status(200).json(users);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    })

    app.delete("/share/:user", async (req, res) => {
        const username = req.params.user;
        const { url } = req.body; // Destructure the URL from the body
    
        try {
            const mangaProvider = new ShareProvider(mongoClient);
            const deleteManga = await mangaProvider.deleteShared(username, url);
    
            res.status(200).json(deleteManga);
        } catch (error) {
            console.error(error);
            res.status(500)
            // .json({ error: error.message });
        }
    });
}