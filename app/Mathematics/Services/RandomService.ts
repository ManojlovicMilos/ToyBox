import * as Core from './../../Core/Core';

@Core.Injectable('TBX.RandomService')
class RandomService extends Core.Service {
    public static Next(Min: number, Max: number): number {
        return Math.floor(Math.random() * (Max - Min + 1)) + Min;
    }
}

export default RandomService;
