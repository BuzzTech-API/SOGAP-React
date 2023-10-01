import Evidence from "./Evidence"

export default class RequestForEvidence {
    private _id!: number
    private _requiredDocument!: string
    private _description!: string
    private _step_id!: number
    private _user_id!: number
    private _evidenceValidationDate!: Date    
    private _deliveryDate!: Date
    private _is_validated!: boolean
    private _is_actived!: boolean
    private _evidences: Array<Evidence> = []


    constructor (
        id:number,
        requiredDocument: string,
        description: string,
        step_id: number,
        user_id: number,
        evidenceValidationDate: Date,    
        deliveryDate: Date,
        is_validated: boolean,
        is_actived: boolean,
        evidences: Array<Evidence>,
        )
    constructor()
    constructor (
        id?:number,
        requiredDocument?: string,
        description?: string,
        step_id?: number,
        user_id?: number,
        evidenceValidationDate?: Date,    
        deliveryDate?: Date,
        is_validated?: boolean,
        is_actived?: boolean,
        evidences?: Array<Evidence>,
        ) 
        {
            if (id !== undefined &&
                requiredDocument !== undefined &&
                description !== undefined &&
                step_id !== undefined &&
                user_id !== undefined &&
                evidenceValidationDate !== undefined &&
                deliveryDate !== undefined &&
                is_validated !== undefined &&
                is_actived !== undefined &&
                evidences !== undefined) {
                
                this._id = id
                this._requiredDocument = requiredDocument
                this._description = description
                this._step_id = step_id
                this._user_id = user_id
                this._evidenceValidationDate = evidenceValidationDate
                this._deliveryDate = deliveryDate
                this._is_validated = is_validated
                this._is_actived = is_actived
                this._evidences = evidences
            }
    }

    public get id(): number {
        return this._id
    }
    public set id(value: number) {
        this._id = value
    }
    public get evidences(): Array<Evidence> {
        return this._evidences
    }
    public set evidences(value: Array<Evidence>) {
        this._evidences = value
    }
    public get is_actived(): boolean {
        return this._is_actived
    }
    public set is_actived(value: boolean) {
        this._is_actived = value
    }
    public get is_validated(): boolean {
        return this._is_validated
    }
    public set is_validated(value: boolean) {
        this._is_validated = value
    }
    public get evidenceValidationDate(): Date {
        return this._evidenceValidationDate
    }
    public set evidenceValidationDate(value: Date) {
        this._evidenceValidationDate = value
    }
    public get deliveryDate(): Date {
        return this._deliveryDate
    }
    public set deliveryDate(value: Date) {
        this._deliveryDate = value
    }
    public get step_id(): number {
        return this._step_id
    }
    public set step_id(value: number) {
        this._step_id = value
    }
    public get user_id(): number {
        return this._user_id
    }
    public set user_id(value: number) {
        this._user_id = value
    }
    public get description(): string {
        return this._description
    }
    public set description(value: string) {
        this._description = value
    }
    public get requiredDocument(): string {
        return this._requiredDocument
    }
    public set requiredDocument(value: string) {
        this._requiredDocument = value
    }
}