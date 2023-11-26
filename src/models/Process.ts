import Step from "./Steps";
import User from "./User";

export default class Process {
    private _id!: number;
    private _title!: string;
    private _description!: string;
    private _objective!: string;
    private _endingDate!: Date;
    private _createDate!: Date;
    private _lastUpdate!: Date;
    private _is_active!: boolean;
    private _priority!: string;
    private _status!: string;
    private _steps: Array<Step> = [];
    private _users: Array<User> = [];
    
    constructor(
        id: number,
        title: string,
        description: string,
        objective: string,
        endingDate: Date,
        createDate: Date,
        lastUpdate: Date,
        is_active: boolean,
        priority: string,
        status: string,
        steps: Array<Step>,
        users: Array<User> 
        )
    constructor()
    constructor(
        id?: number,
        title?: string,
        description?: string,
        objective?: string,
        endingDate?: Date,
        createDate?: Date,
        lastUpdate?: Date,
        is_active?: boolean,
        priority?: string,
        status?: string,
        steps?: Array<Step>,
        users?: Array<User> 
        ) {
        if (id!==undefined &&
            title!==undefined &&
            description!==undefined &&
            endingDate!==undefined &&
            createDate!==undefined &&
            lastUpdate!==undefined &&
            is_active!==undefined &&
            priority!==undefined &&
            status!==undefined &&
            steps!==undefined &&
            users!==undefined &&
            objective!==undefined) {
            
                this._id = id
                this._title = title
                this._description = description
                this._objective = objective
                this._endingDate = endingDate
                this._createDate = createDate
                this._lastUpdate = lastUpdate
                this._is_active = is_active
                this._priority = priority
                this._status = status
                this._steps = steps
                this._users = users
        }

    }
    

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }
    
    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    public get users(): Array<User> {
        return this._users;
    }

    public set users(value: Array<User>) {
        this._users = value;
    }

    public get endingDate(): Date {
        return this._endingDate;
    }
    public set endingDate(value: Date) {
        this._endingDate = value;
    }
    public get createDate(): Date {
        return this._createDate;
    }
    public set createDate(value: Date) {
        this._createDate = value;
    }
    public get lastUpdate(): Date {
        return this._lastUpdate;
    }
    public set lastUpdate(value: Date) {
        this._lastUpdate = value;
    }
    public get is_active(): boolean {
        return this._is_active;
    }
    public set is_active(value: boolean) {
        this._is_active = value;
    }
    public get priority(): string {
        return this._priority;
    }
    public set priority(value: string) {
        this._priority = value;
    }
    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        this._status = value;
    }
    public get steps(): Array<Step> {
        return this._steps;
    }
    public set steps(value: Array<Step>) {
        this._steps = value;
    }

    public get objective(): string {
        return this._objective;
    }
    public set objective(value: string) {
        this._objective = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get stepsLength(): number {
        return this._steps.length;
    }
    get stepsConcluidas(): number {
        return this._steps.filter((step) => step.status === 'Concluído').length;
    }
    get stepsNaoIniciadas(): number {
        return this._steps.filter((step) => step.status === 'Não Iniciado').length;
    }
    get stepsIniciadas(): number{
        return this._steps.filter((step) => step.status === 'Iniciado').length;
    }
}
