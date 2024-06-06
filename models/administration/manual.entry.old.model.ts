import { ManualEntrySchema } from '../../schemas/administration/manual.entry.schema';
import { BaseModel } from '../base.model';
import { COLLECTION_NAME_ENUM, MANUAL_ENTRY_STATUS_ENUM } from '../../utils/enums';
import { IManualEntry } from '../../interfaces/administration/manual.entry.interface';
import { AccountEntrySchema } from '../../schemas/administration/account.entry.schema';
import { IAccountEntry } from '../../interfaces/administration/account.entry.interface';
import { IApproveProcess } from '../../interfaces/configuration/approve.process.interface';
import { WorkflowProcessSchema } from '../../schemas/configuration/workflow.process.schema';
import { ApproveProcessModel } from '../configuration/approve.process.model';
import { MailModel } from '../security/mail.model'
import { AccountSchema } from '../../schemas/configuration/account.schema';
import { UserModel } from '../security/user.model';
import { IUser } from '../../interfaces/security/user.interface';
import { IAccount } from '../../interfaces/configuration/account.interface';


export class ManualEntryOldModel extends BaseModel {
    constructor() {
        super(ManualEntrySchema, COLLECTION_NAME_ENUM.manual_entry_old, {
            code: 'ME'
        })
    }

    async save(manual_entry: IManualEntry) {
        let me = await super.save(manual_entry);
        if (!manual_entry.workflow) {
            this.generate_entry(Object.assign({}, me));
        } else if (!manual_entry.inout_account) {
            await this.start_process(me);
        }
        manual_entry._id = me._id;
        return manual_entry;
    }

    async update(_id: string, manual_entry: any) {
        await super.update(_id, manual_entry);
        return `${this.document_name} actualizado correctamente.`;
    }

    async reject(manual_entry: IManualEntry) {
        let workflow_processModel = new BaseModel(WorkflowProcessSchema, COLLECTION_NAME_ENUM.workflow_process),
            approve_processModel = new ApproveProcessModel(),
            approve_proccess = await approve_processModel.filter({
                manual_entry: manual_entry._id,
                approved: { $exists: false }
            }, {
                workflow_process: {
                    _id: 1,
                    order: 1
                },
                workflow: {
                    _id: 1
                }
            });
        if (approve_proccess.length <= 0) {
            await this.model.updateOne({ _id: manual_entry._id }, {
                $set: { status: MANUAL_ENTRY_STATUS_ENUM.rejected }
            }, {});
            try {
                await this.send_mail(manual_entry.create_user._id, `Rechazo ${manual_entry.code} ${manual_entry.office.name}`, `
                <p> Su entrada numero ${manual_entry.code} ha sido rechazada por el
                administrador, desde el sistema Portal Web Contable.</p>
                <p>Favor revisar los motivos para su corrección.</p>` );
            } catch (e) {
                console.log('Error sending mail.')
            }
            return manual_entry;
        }
        let proccess = approve_proccess[0];
        let processes = await workflow_processModel.filter({
            _id: { $ne: proccess.workflow_process._id },
            workflow: proccess.workflow._id,
            order: proccess.workflow_process.order - 1
        }, null, { order: 1 });
        if (processes.length > 0) {
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
            await approve_processModel.save(process);
        } else {
            manual_entry.status = MANUAL_ENTRY_STATUS_ENUM.rejected;
            await this.update(manual_entry._id, manual_entry);
        }
        try {
            await this.send_mail(manual_entry.create_user._id, `Rechazo ${manual_entry.code} ${manual_entry.office.name}`, `
            <p> Su entrada numero ${manual_entry.code} ha sido rechazada por el
            administrador, desde el sistema Portal Web Contable.</p>
            <p>Favor revisar los motivos para su corrección.</p>` );
        } catch (e) {
            console.log('Error sending mail.')
        }
        proccess.approved = false;
        proccess.date = new Date();
        await approve_processModel.update(proccess['_id'], proccess);
        return manual_entry;
    }

    async approve(manual_entry: IManualEntry) {
        let workflow_processModel = new BaseModel(WorkflowProcessSchema, COLLECTION_NAME_ENUM.workflow_process),
            approve_processModel = new ApproveProcessModel(),
            approve_proccess = await approve_processModel.filter({
                manual_entry: manual_entry._id,
                approved: { $exists: false }
            }, {
                workflow_process: {
                    _id: 1,
                    order: 1
                },
                workflow: {
                    _id: 1
                }
            });
        if (approve_proccess.length <= 0) {
            await this.generate_entry(manual_entry);
            try {
                await this.send_mail(manual_entry.create_user._id, `Aprobación ${manual_entry.code} ${manual_entry.office.name}`, `
                <p> Su entrada numero ${manual_entry.code} ha sido aprobada por el
                    administrador, desde el sistema Portal Web Contable.</p>` );
            } catch (e) {
                console.log('Error sending mail.')
            }
            return;
            //throw new Error('No existste proceso de aprobación');
        }
        let proccess = approve_proccess[0],
            processes = await workflow_processModel.filter({
                _id: { $ne: proccess.workflow_process._id },
                workflow: proccess.workflow._id,
                order: proccess.workflow_process.order + 1
            }, null, { order: 1 });
        if (processes.length > 0) {
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
            await approve_processModel.save(proc);
        } else {
            await this.generate_entry(manual_entry)
            try {
                await this.send_mail(manual_entry.create_user._id, `Aprobación ${manual_entry.code} ${manual_entry.office.name}`, `
                <p> Su entrada numero ${manual_entry.code} ha sido aprobada por el
                    administrador, desde el sistema Portal Web Contable.</p>` );
            } catch (e) {
                console.log('Error sending mail.')
            }
        }
        proccess.approved = true;
        proccess.date = new Date();
        await approve_processModel.update(proccess['_id'], proccess);
    }

    async start_process(manual_entry: IManualEntry) {
        let workflow_processModel = new BaseModel(WorkflowProcessSchema, COLLECTION_NAME_ENUM.workflow_process),
            approve_processModel = new ApproveProcessModel(),
            workflow_process = await workflow_processModel.filter({
                workflow: manual_entry.workflow._id
            }, {}, {
                order: 1
            }, 0, 1);
        if (workflow_process.length > 0) {
            let process: IApproveProcess = {
                workflow: manual_entry.workflow,
                number: 1,
                manual_entry: manual_entry,
                workflow_process: workflow_process[0],
                user: workflow_process[0].user,
                setting: manual_entry.setting,
                create_date: new Date(),
                create_user: manual_entry.create_user
            };
            await approve_processModel.save(process);
            manual_entry.status = workflow_process[0].name;
            await this.update(manual_entry._id, manual_entry);
            try {
                await this.send_mail(process.user._id, `Pendiente Validación ${manual_entry.code} ${manual_entry.office.name}`, `
                <p> Usted ha recibido una solicitud de validación de la entrada
                    numero ${manual_entry.code}, desde el sistema Portal Web Contable.</p>
                <p>
                    Esta solicitud ha sido enviada por parte del usuario ${manual_entry.create_user.name} ${manual_entry.create_user.last_name}, de la sucursal ${manual_entry.office.name}.
                </p>` );
            } catch (e) {
                console.log('Error sending mail.')
            }
        }
    }

    async generate_entry(manual_entry: IManualEntry) {
        let accountEntryModel = new BaseModel(AccountEntrySchema, COLLECTION_NAME_ENUM.account_entry),
            account_entries = manual_entry.entries.map((entry: IAccountEntry) => {
                delete entry._id;
                entry.create_date = manual_entry.create_date;
                entry.create_user = manual_entry.create_user;
                entry.setting = manual_entry.setting;
                entry.manual_entry = manual_entry;
                return entry;
            });
        await accountEntryModel.saveMeny(account_entries);
        let entries: IAccountEntry[] = await accountEntryModel.filter({
            manual_entry: manual_entry._id
        });

        let accountModel = new BaseModel(AccountSchema, COLLECTION_NAME_ENUM.account);
        for (let i = 0; i < entries.length; i++) {
            let entry: IAccountEntry = entries[i],
                account: IAccount = await accountModel.get(entry.account._id),
                balance: number = account.balance || 0;
            if (entry.origin == account.type.origin) {
                balance += entry.amount;
            } else {
                balance -= entry.amount;
            }
            await accountModel.model.updateOne({ _id: entry.account._id }, { $set: { balance: balance } });
        }

        manual_entry.entries = entries;
        manual_entry.status = MANUAL_ENTRY_STATUS_ENUM.approved;
        await super.update(manual_entry._id, manual_entry);
    }

    async send_mail(user_id: string, subject: string, body: string) {
        return //Email desabled
        let userModel = new UserModel(),
            to_user: IUser = await userModel.get(user_id);
        let mailModel = new MailModel();
        await mailModel.send(null, [to_user.email], subject, body);
    }
}