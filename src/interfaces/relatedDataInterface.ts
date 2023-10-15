import Process from "../models/Process";
import RequestForEvidence from "../models/RequestForEvidence";
import Step from "../models/Steps";

export interface MyRelatedData{
    processes: Process[]
    steps: Step[]
    requests: RequestForEvidence[]
}