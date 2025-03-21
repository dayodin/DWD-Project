import { MongoClient, ObjectId } from "mongodb";

interface ISharedItem {
    mangaId: string;
    series: string;
    vol: string;
}

export interface MangaDocument {
    _id: string;
    url: string;
    series: string;
    author: string;
    vol: string;
}

export class MangaProvider {
    constructor(private readonly mongoClinet: MongoClient) {}

    async getAllManga(): Promise<any[]> {
        console.log("hello")

        const collectionName = process.env.MANGA_COLLECTION_NAME || "manga"
        if (!collectionName) {
            throw new Error("Missing MANGAMANGA_COLLECTION_NAME from env variables")
        }

        console.log(collectionName)

        const manga = await this.mongoClinet.db().collection(collectionName).find().toArray();

        return manga;
    }

    async getAllAddManga(): Promise<any[]> {
        console.log("hello")

        const collectionName = process.env.ADD_MANGA_COLLECTION_NAME || "addManga"
        if (!collectionName) {
            throw new Error("Missing MANGA_COLLECTION_NAME from env variables")
        }

        console.log(collectionName)

        const manga = await this.mongoClinet.db().collection(collectionName).find().toArray();

        return manga;
    }

    async getAllSharedManga(shared: ISharedItem[]): Promise<any> {

        const mangaCollectionName = process.env.ADD_MANGA_COLLECTION_NAME || "manga"
        const addMangaCollectionName = process.env.ADD_MANGA_COLLECTION_NAME || "addManga"

        console.log(shared)

        const db = this.mongoClinet.db();
        const mangaCol = db.collection(mangaCollectionName);
        const addMangaCol = db.collection(addMangaCollectionName);

        const sharedManga = shared.map(async item => {
            console.log(item);

            // Await the findOne results for both collections.
            const mangaResult = await this.mongoClinet.db().collection(mangaCollectionName).findOne({ series: "Naruto", vol: "2" });
            const addMangaResult = await this.mongoClinet.db().collection(addMangaCollectionName).findOne({ series: item.series, vol: item.vol });
            
            console.log(mangaResult);
            console.log(addMangaResult);

            // Check if mangaResult exists; if so, return it. Otherwise, return addMangaResult.
            if (mangaResult) {
                return mangaResult;
            } else {
                return addMangaResult;
            }
        });

        

        return sharedManga;
    }

    async postManga(newManga: MangaDocument) {
        const collectionName = process.env.MANGA_COLLECTION_NAME || "manga"
        const response = await this.mongoClinet.db().collection<MangaDocument>(collectionName).insertOne(newManga)

        console.log(response)

        return newManga
    }

    async postAddManga(newManga: MangaDocument) {
        const collectionName = process.env.ADD_MANGA_COLLECTION_NAME || "addmanga"
        const response = await this.mongoClinet.db().collection<MangaDocument>(collectionName).insertOne(newManga)

        console.log(response)

        return newManga
    }

    async deleteManga(mangaId: string, series: string, vol: string) {
        const collectionName = process.env.MANGA_COLLECTION_NAME || "manga"
        const response = await this.mongoClinet.db().collection(collectionName).deleteOne( { series: series, vol: vol } ) 
        // const response = await this.mongoClinet.db().collection(collectionName).deleteOne( { _id : new ObjectId(mangaId) } ) 

        console.log(response)

        return mangaId
    }

    async deleteAddManga(mangaId: string, series: string, vol: string) {
        const collectionName = process.env.ADD_MANGA_COLLECTION_NAME || "addmanga"
        const response = await this.mongoClinet.db().collection(collectionName).deleteOne( { series: series, vol: vol } ) 
        // const response = await this.mongoClinet.db().collection(collectionName).deleteOne( { _id : new ObjectId(mangaId) } ) 

        console.log(response)

        return mangaId
    }
}