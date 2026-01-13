import * as Core from '../../Core/Core';

enum RequestType {
    Get = "GET",
    Post = "POST",
    Update = "PUT",
    Delete = "DELETE"
}

@Core.Injectable('TBX.HTTPService')
class HTTPService extends Core.Service {
    public Get(Url: string): Promise<any> {
        return this.Request(RequestType.Get, Url);
    }

    public Delete(Url: string): Promise<any> {
        return this.Request(RequestType.Delete, Url);
    }

    public Post(Url: string, Body?: Object): Promise<any> {
        return this.Request(RequestType.Post, Url, Body);
    }

    public Update(Url: string, Body?: Object): Promise<any> {
        return this.Request(RequestType.Update, Url, Body);
    }

    private Request(Type: RequestType, Url: string, Body?: Object): Promise<any> {
        return new Promise((Resolve: Function, Reject: Function) => {
            let Request: any = new XMLHttpRequest();
            Request.open(<string>Type, Url, false);
            Request.onreadystatechange = function () {
                if (Request.readyState === 4) {
                    if (Request.status === 200 || Request.status == 0) {
                        Resolve(Request.responseText);
                    }
                    else Reject({ Status: Request.status });
                }
            }
            .bind(this);
            Request.send(Body);
        });
    }
}

export default HTTPService;
