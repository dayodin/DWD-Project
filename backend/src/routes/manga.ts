import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";

import { MangaProvider } from "../MangaProvider";

export function registerMangaRoutes(app: express.Application, mongoClient: MongoClient) {

    app.get("/api/manga", async (req, res) => {

        try {
            const mangaProvider = new MangaProvider(mongoClient)
            const manga = await mangaProvider.getAllManga()

            res.json(manga);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    })

    app.get("/api/addmanga", async (req, res) => {

        try {
            const mangaProvider = new MangaProvider(mongoClient)
            const addmanga = await mangaProvider.getAllAddManga()

            res.json(addmanga);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    })

    app.post("/api/manga", async (req, res): Promise<any> => {
        const { _id, url, series, author, vol } = req.body;
        
        console.log(series);

        try {
            const mangaProvider = new MangaProvider(mongoClient)
            const addmanga = await mangaProvider.postManga(req.body)
            const deleteManga = await mangaProvider.deleteAddManga(_id, series, vol)

            res.status(201).json(addmanga);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    })
    
    app.post("/api/addmanga", async (req, res): Promise<any> => {
        const { _id, url, series, author, vol } = req.body;
        
        console.log(series);

        try {
            const mangaProvider = new MangaProvider(mongoClient)
            const addmanga = await mangaProvider.postAddManga(req.body)

            res.status(201).json(addmanga);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    })

    app.delete("/api/manga", async (req, res): Promise<any> => {
        const { _id, url, series, author, vol } = req.body;
        
        try {
            const mangaProvider = new MangaProvider(mongoClient)
            const deleteManga = await mangaProvider.deleteManga(_id, series, vol)
            const addmanga = await mangaProvider.postAddManga(req.body)

            res.status(201).json(deleteManga);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    })

    app.delete("/api/addmanga", async (req, res): Promise<any> => {
        const { _id, url, series, author, vol } = req.body;
        
        try {
            const mangaProvider = new MangaProvider(mongoClient)
            const deleteManga = await mangaProvider.deleteAddManga(_id, series, vol)

            res.status(201).json(deleteManga);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    })
}