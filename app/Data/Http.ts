enum RequestType {
    Get = "GET",
    Post = "POST",
    Update = "PUT",
    Delete = "DELETE"
}

export default class HTTP {
    public static Get<T>(url: string): Promise<T> {
        return HTTP.Request<T>(RequestType.Get, url);
    }

    public static Delete(url: string): Promise<boolean> {
        return HTTP.Request<boolean>(RequestType.Delete, url);
    }

    public static Post<T>(url: string, body?: Object): Promise<T> {
        return HTTP.Request<T>(RequestType.Post, url, body as Object);
    }

    public static Update<T>(url: string, body?: Partial<T>): Promise<T> {
        return HTTP.Request<T>(RequestType.Update, url, body as Object);
    }
    
    private static Request<T>(type: RequestType, url: string, body?: Object): Promise<T> {
        return new Promise((Resolve: Function, Reject: Function) => {
            let Request: XMLHttpRequest = new XMLHttpRequest();
            Request.open(<string>type, url, false);
            Request.onreadystatechange = function () {
                if (Request.readyState === 4) {
                    if (Request.status === 200 || Request.status == 0) {
                        Resolve(Request.responseText);
                    }
                    else Reject({ Status: Request.status });
                }
            }.bind(this);
            Request.send(body as Document);
        });
    }
}
