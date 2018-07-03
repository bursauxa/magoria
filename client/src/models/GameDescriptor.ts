export default class GameDescriptor {
    public name: string;
    public numberOfPlayers: number;
    public id: string | null;
    // public players: string[];

    public constructor(name: string, numberOfPlayers: number, id?: string) {
    // public constructor(name: string, players: string[], id?: string) {
        this.name = name;
        this.numberOfPlayers = numberOfPlayers;
        // this.players = players;
        this.id = id ? id : null;
    }

    public static fromServerObjects(data: any[]): GameDescriptor[] {
        const result: GameDescriptor[] = [];
        data.forEach((element: any) => result.push(GameDescriptor.fromServerObject(element)));
        return result;
    }

    public static fromServerObject(data: any): GameDescriptor {
        return new GameDescriptor(data.name, data.numberOfPlayers, data.id);
        // return new GameDescriptor(data.name, data.players, data.id);
    }

    // public get numberOfPlayers(): number {
    //     return this.players ? this.players.length : 0;
    // }
}
