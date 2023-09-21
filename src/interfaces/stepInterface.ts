import RequestForEvidence from "../models/RequestForEvidence"
import User from "../models/User"
import { ProcessUser } from "./processInterface"



export interface StepInterface{
    id: number
    process_id: number
    order: number
    objective: string
    endingDate: Date
    endDate: Date
    priority: string
    is_active: boolean
    users: Array<ProcessUser>
    requestsForEvidence: Array<RequestForEvidence>
}