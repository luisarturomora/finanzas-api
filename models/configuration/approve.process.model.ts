import { ApproveProcessSchema } from '../../schemas/configuration/approve.process.schema';
import { BaseModel } from '../base.model';
import { COLLECTION_NAME_ENUM, MANUAL_ENTRY_STATUS_ENUM } from '../../utils/enums';
import { IApproveProcess } from '../../interfaces/configuration/approve.process.interface';
import { WorkflowProcessSchema } from '../../schemas/configuration/workflow.process.schema';
import { ManualEntryModel } from '../administration/manual.entry.model';
import { IManualEntry } from '../../interfaces/administration/manual.entry.interface';


export class ApproveProcessModel extends BaseModel {
    constructor() {
        super( ApproveProcessSchema, COLLECTION_NAME_ENUM.approve_process )
    }

    async reject(proccess: IApproveProcess){
        let workflow_processModel = new BaseModel(WorkflowProcessSchema, COLLECTION_NAME_ENUM.workflow_process),
            processes = await workflow_processModel.filter({
            _id: { $ne: proccess.workflow_process._id },
            workflow: proccess.workflow._id,
            order: proccess.workflow_process.order - 1
        }, null, { order: 1});
        if(processes.length > 0){
            let process: IApproveProcess = {
                workflow: proccess.workflow,
                number: processes[0].order,
                manual_entry: proccess.manual_entry,
                workflow_process: processes[0],
                user: processes[0].user,
                setting: processes[0].setting,
                create_date: new Date(),
                create_user: proccess.user
            };
            await this.save(process);
        }else{
            if(!!proccess.manual_entry){
                let manual_approveModel = new ManualEntryModel(),
                manual_entry:IManualEntry = await manual_approveModel.get(proccess.manual_entry._id);
                manual_entry.status = MANUAL_ENTRY_STATUS_ENUM.rejected;
                await manual_approveModel.update(manual_entry._id, manual_entry);
            }
        }
        proccess.approved = false;
        proccess.date = new Date();
        await this.update(proccess['_id'] , proccess);
    }
    
    async approve(proccess: IApproveProcess){
        let workflow_processModel = new BaseModel(WorkflowProcessSchema, COLLECTION_NAME_ENUM.workflow_process),
            processes = await workflow_processModel.filter({
            _id: { $ne: proccess.workflow_process._id },
            workflow: proccess.workflow._id,
            order: proccess.workflow_process.order + 1
        }, null, { order: 1});
        if(processes.length > 0){
            let proc: IApproveProcess = {
                workflow: proccess.workflow,
                number: processes[0].order,
                manual_entry: proccess.manual_entry,
                workflow_process: processes[0],
                user: processes[0].user,
                setting: processes[0].setting,
                create_date: new Date(),
                create_user: proccess.user
            };
            await this.save(proc);
        }else{
            if(!!proccess.manual_entry){
                let manual_approveModel = new ManualEntryModel(),
                    manual_entry:IManualEntry = await manual_approveModel.get(proccess.manual_entry._id);
                await manual_approveModel.generate_entry(manual_entry);
            }
        }
        proccess.approved = true;
        proccess.date = new Date();
        await this.update(proccess['_id'] , proccess);
    }
}