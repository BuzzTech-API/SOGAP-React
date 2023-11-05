
export default class NotificationClass {

    private _id!: number;
    private _typeOfEvent!: string;
    private _title!: string;
    private _mensage!: string;
    private _addressed!: number;
    private _sender!: number;
    private _is_visualized!: boolean;

    constructor(
        id: number,
        typeOfEvent: string,
        title: string,
        mensage: string,
        addressed: number,
        sender: number,
        is_visualized: boolean
    )
    constructor()
    constructor(
        id?: number,
        typeOfEvent?: string,
        title?: string,
        mensage?: string,
        addressed?: number,
        sender?: number,
        is_visualized?: boolean
    ) {
        if (
            id !== undefined &&
            typeOfEvent !== undefined &&
            title !== undefined &&
            mensage !== undefined &&
            addressed !== undefined &&
            sender !== undefined &&
            is_visualized !== undefined) {
            this._id = id
                this._typeOfEvent = typeOfEvent
                this._title = title
                this._mensage = mensage
            this._addressed = addressed
            this._sender = sender
            this._is_visualized = is_visualized
        }

    }


    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get typeOfEvent(): string {
        return this._typeOfEvent;
    }

    public set typeOfEvent(value: string) {
        this._typeOfEvent = value;
    }

    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    public get mensage(): string {
        return this._mensage;
    }

    public set mensage(value: string) {
        this._mensage = value;
    }

    public get addressed(): number {
        return this._addressed;
    }

    public set addressed(value: number) {
        this._addressed = value;
    }

    public get sender(): number {
        return this._sender;
    }

    public set sender(value: number) {
        this._sender = value;
    }

    public get is_visualized(): boolean {
        return this._is_visualized;
    }

    public set is_visualized(value: boolean) {
        this._is_visualized = value;
    }

}