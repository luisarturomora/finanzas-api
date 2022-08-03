import { BaseModel } from '../base.model';
import { COLLECTION_NAME_ENUM, PAYMENT_DEPOSIT_STATUS_ENUN, PAYMENT_STATUS_ENUN } from '../../utils/enums';
import { Utils } from '../../utils/utils';
import { startSession, ClientSession } from 'mongoose';
import { AccountEntryModel } from './account.entry.model';
import { PaymentDepositSchema } from '../../schemas/administration/payment.deposit.schema';
import { IPaymentDeposit } from '../../interfaces/administration/payment.deposit.interface';
import { PaymentModel } from './payment.model';
import { IPayment } from '../../interfaces/administration/payment.interface';

export class PaymentDepositModel extends BaseModel {
    constructor() {
        super(PaymentDepositSchema, COLLECTION_NAME_ENUM.payment_deposit)
    }

    async save(_deposit: IPaymentDeposit) {
        let session: ClientSession = await startSession()
        await session.startTransaction();
        try {
            let code = await Utils.generate_code('PD', _deposit.setting, this),
                accountEntryModel = new AccountEntryModel(),
                paymentModel = new PaymentModel();

            _deposit.code = code;
            _deposit.status = PAYMENT_DEPOSIT_STATUS_ENUN.created;


            let deposit = await super.save(_deposit);
            
            await accountEntryModel.payment_deposit_entry(deposit);
            for (let i: number = 0; i < _deposit.payments.length; i++) {
                let payment:IPayment = _deposit.payments[i];
                
                await paymentModel.model.update({
                    _id: payment._id
                }, {
                    $set: {
                        status: PAYMENT_STATUS_ENUN.deposited
                    }
                });
                payment.create_user = payment.create_user;
                payment.note = payment.note;
                payment.setting = payment.setting;
                payment.create_date = payment.create_date;
                await accountEntryModel.payment_entry(payment, false);
            }

            session.commitTransaction();
            return deposit
        } catch (error) {
            session.abortTransaction();
            console.log(error)
            throw new Error(error);
        }
    }
}