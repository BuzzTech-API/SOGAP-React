import Process from "./Process"

export default class User {
    private _name: string
    private _role: string
    private _team: string
    private _email: string
    private _is_active: boolean
    private _id: number
    
    private _processes: Array<Process> = []
    
    constructor(name: string,
        role: string,
        team: string,
        is_active: boolean,
        id: number,
        email: string,
        processes: Array<Process>
        ) {
        this._id = id
        this._name = name
        this._role = role
        this._team = team
        this._is_active = is_active
        this._email = email
        this._processes = processes
    }

    public get id(): number {
        return this._id
    }

    public set id(value: number) {
        this._id = value
    }

    public get name(): string {
        return this._name
    }

    public set name(value: string) {
        this._name = value
    }

    public get processes(): Array<Process> {
        return this._processes
    }

    public set processes(value: Array<Process>) {
        this._processes = value
    }

    public get role(): string {
        return this._role
    }

    public set role(value: string) {
        this._role = value
    }

    public get team(): string {
        return this._team
    }
    public set team(value: string) {
        this._team = value
    }

    public get is_active(): boolean {
        return this._is_active
    }
    public set is_active(value: boolean) {
        this._is_active = value
    }
    public get email(): string {
        return this._email
    }
    public set email(value: string) {
        this._email = value
    }
}