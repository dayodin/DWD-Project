import { MongoClient } from "mongodb";

interface ISharedItem {
    url: string;
    series: string;
    vol: string;
}

interface ICredentialsDocument {
    username: string;
    password: string;
    shared: ISharedItem[]
}

export class ShareProvider {
    constructor(private readonly mongoClinet: MongoClient) {}

    async getShared(username: string): Promise<any> {
        const collectionName = process.env.CREDS_COLLECTION_NAME || "userCreds";
        const response = await this.mongoClinet.db().collection<ICredentialsDocument>(collectionName).findOne( { username } ) 
            
        if (response !== null){
            // const mangaProvider = new MangaProvider(this.mongoClinet)
            // const shared = await mangaProvider.getAllSharedManga(response.shared)
            
            return response.shared;
        }
        return false;
    }

    async postNewShared(username: string, url: string, series: string, vol: string): Promise<any> {
        const collectionName = process.env.CREDS_COLLECTION_NAME || "userCreds";
        const updateResult  = await this.mongoClinet.db().collection<ICredentialsDocument>(collectionName).updateOne(
            { username },
            { $push: { shared: { url, series, vol } } }
        ) 

        return updateResult;
    }

    async getUsers(): Promise<any> {
        const collectionName = process.env.CREDS_COLLECTION_NAME || "userCreds";
        const response = await this.mongoClinet.db().collection<ICredentialsDocument>(collectionName).find().toArray()
            
        if (response !== null){
            // const mangaProvider = new MangaProvider(this.mongoClinet)
            // const shared = await mangaProvider.getAllSharedManga(response.shared)
            
            return response.map(user => user.username);
        }
        return false;
    }

    async deleteShared(username: string, url: string): Promise<any> {
        const collectionName = process.env.CREDS_COLLECTION_NAME || "userCreds";
        const result = await this.mongoClinet
            .db()
            .collection<ICredentialsDocument>(collectionName)
            .updateOne(
                { username },
                { $pull: { shared: { url } } }
            );
        return result;
    }
}