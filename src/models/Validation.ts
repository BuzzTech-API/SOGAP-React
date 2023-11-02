export default class Validation {
    
    private _id!: number;
    private _evidence_id!: number;
    private _reason!: string;
    private _user_id!: number;
    private _is_validated!: boolean;
    
    constructor(
        id: number,
        evidence_id: number,
        reason: string,
        user_id: number,
        is_validated: boolean
    )
    constructor()
    constructor(
        id?: number,
        evidence_id?: number,
        reason?: string,
        user_id?: number,
        is_validated?: boolean
    ) {
        if (
            id!== undefined && 
            evidence_id !== undefined && 
            reason !== undefined &&
            user_id !== undefined &&
            is_validated !== undefined
            ) {
                this._id = id
                this._evidence_id = evidence_id
                this._reason = reason
                this._user_id = user_id
                this._is_validated = is_validated
            
        }

    }
    
    public get id() : number {
        return this._id
    }
    
    public set id(value: number){
        this._id = value
    }
    
    public get evidence_id() : number {
        return this._evidence_id
    }
    
    public set evidence_id(value: number){
        this._evidence_id = value
    }
    
    public get reason() : string {
        return this._reason
    }
    
    public set reason(value: string){
        this._reason = value
    }
    
    public get user_id() : number {
        return this._user_id
    }
    
    public set user_id(value: number){
        this._user_id = value
    }
    
    public get is_validated() : boolean {
        return this._is_validated
    }
    
    public set is_validated(value: boolean){
        this._is_validated = value
    }
    
}