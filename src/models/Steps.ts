import { StepUser } from "../interfaces/stepInterface"
import RequestForEvidence from "./RequestForEvidence"

export default class Step {
    
    private _id!: number
    private _process_id!: number
    private _name!: string
    private _status!: string
    private _order!: number
    private _objective!: string
    private _endingDate!: Date
    private _endDate!: Date
    private _priority!: string
    private _is_active!: boolean
    private _users: Array<StepUser> =[]
    private _requests: Array<RequestForEvidence> = []
    
    
    constructor(
        id:number,
        process_id:number,
        name:string,
        status:string,
        order:number,
        objective:string,
        endingDate:Date,
        endDate:Date,
        priority:string,
        is_active:boolean,
        users:Array<StepUser>,
        requests:Array<RequestForEvidence>,
        )
    constructor()
    constructor(
        id?:number,
        process_id?:number,
        name?:string,
        status?:string,
        order?:number,
        objective?:string,
        endingDate?:Date,
        endDate?:Date,
        priority?:string,
        is_active?:boolean,
        users?:Array<StepUser>,
        requests?:Array<RequestForEvidence>,
        ) {
        if( id!==undefined &&
            process_id!==undefined &&
            name!==undefined &&
            status!==undefined &&
            order!==undefined &&
            objective!==undefined &&
            endingDate!==undefined &&
            endDate!==undefined &&
            priority!==undefined &&
            is_active!==undefined &&
            users!==undefined &&
            requests!==undefined){

                this._id = id
                this._process_id = process_id
                this._name = name
                this._status = status
                this._order = order
                this._objective = objective
                this._endingDate = endingDate
                this._endDate = endDate
                this._priority = priority
                this._is_active = is_active
                this._users = users
                this._requests = requests
            }
    }
    public get id(): number {
        return this._id
    }
    public set id(value: number) {
        this._id = value
    }
    public get requests(): Array<RequestForEvidence> {
        return this._requests
    }
    public set requests(value: Array<RequestForEvidence>) {
        this._requests = value
    }
    public get objective(): string {
        return this._objective
    }
    public set objective(value: string) {
        this._objective = value
    }
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }

    public get endingDate(): Date {
        return this._endingDate
    }
    public set endingDate(value: Date) {
        this._endingDate = value
    }
    public get endDate(): Date {
        return this._endDate
    }
    public set endDate(value: Date) {
        this._endDate = value
    }
    public get priority(): string {
        return this._priority
    }
    public set priority(value: string) {
        this._priority = value
    }
    public get users(): Array<StepUser> {
        return this._users
    }
    public set users(value: Array<StepUser>) {
        this._users = value
    }
    public get process_id(): number {
        return this._process_id
    }
    public set process_id(value: number) {
        this._process_id = value
    }
    public get order(): number {
        return this._order
    }
    public set order(value: number) {
        this._order = value
    }
    public get is_active(): boolean {
        return this._is_active
    }
    public set is_active(value: boolean) {
        this._is_active = value
    }
    public get status(): string {
        return this._status
    }
    public set status(value: string) {
        this._status = value
    }
}