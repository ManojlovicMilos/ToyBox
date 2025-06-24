import Utility from './Service';

export default class Uuid extends Utility {
    public create(): string {
        let dt: number = new Date().getTime();
        let Uuid: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r: number = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return Uuid;
    }
}
