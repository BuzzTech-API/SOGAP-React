import RequestForEvidence from "../models/RequestForEvidence"
import User from "../models/User"
import { ProcessUser } from "./processInterface"

export interface StepUser{
    user_id: number
    step_id: number
    user:User
}

export interface StepInterface{
    id: number
    process_id: number
    name:string
    order: number
    objective: string
    endingDate: Date
    endDate: Date
    priority: string
    is_active: boolean
    users: Array<StepUser>
    requestsForEvidence: Array<RequestForEvidence>
}