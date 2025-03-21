import HTTP from "./Http";

export default class Reader {
    public static Read(path: string): Promise<any> {
        return HTTP.Get(path).then()
    }
}
