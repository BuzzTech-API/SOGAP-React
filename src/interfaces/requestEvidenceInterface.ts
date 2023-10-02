import Evidence from "../models/Evidence"

export interface UpdateRequestEvidenceInterface{
    requiredDocument: string
    description: string
    step_id: number
    user_id: number
    evidenceValidationDate: string
    deliveryDate: string
    is_validated: boolean
    is_actived: boolean
    id: number
}

export interface RequestEvidenceInterface{
    requiredDocument: string
    description: string
    step_id: number
    user_id: number
    evidenceValidationDate: Date
    deliveryDate: Date
    is_validated: boolean
    is_actived: boolean
    id: number
    evidences: Array<Evidence>
}