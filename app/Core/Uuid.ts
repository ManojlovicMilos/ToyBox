export  { Uuid };

const UUID_FORMAT = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

class Uuid
{
    public static Create():string
    {
        let DT = new Date().getTime();
        let Uuid: string = UUID_FORMAT.replace(/[xy]/g, (C) =>
        {
            let R: number = (DT + Math.random()*16)%16 | 0;
            DT = Math.floor(DT/16);
            return (C=='x' ? R :(R&0x3|0x8)).toString(16);
        });
        return Uuid;
    }
}