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
    name:string
    objective: string
    endingDate: Date
    endDate: Date
    process_id: number
    priority: string
    order: number
    is_active: boolean
    requests: Array<RequestForEvidence>
    users: Array<StepUser>
}