export default class GameDescriptor {
    public name: string;
    public numberOfPlayers: number;
    public id: string | null;

    public constructor(name: string, numberOfPlayers: number, id?: string) {
        this.name = name;
        this.numberOfPlayers = numberOfPlayers;
        this.id = id ? id : null;
    }
}
