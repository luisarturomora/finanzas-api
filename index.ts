import * as express from 'express';
import { json, urlencoded } from 'body-parser';

import * as mongoose from 'mongoose';

const expressJwt = require('express-jwt');
const cors = require('cors');

/**
 * SCHEMAS
 */
import { ModuleSchema } from './schemas/security/module.schema';
import { WidgetSchema } from './schemas/security/widget.schema';
import { EventLogSchema } from './schemas/security/event.log.schema';

/**
 * ROUTES
 */
import { BaseRoute } from './routes/base.router';
import { SettingRoute } from './routes/administration/setting.route';
import { UserRoute } from './routes/security/user.route';

import { BaseController } from './controllers/base.controller';

import { ClientSchema } from './schemas/administration/client.schema';
import { ClientTypeSchema } from './schemas/configuration/client.type.schema';
import { EmployeeSchema } from './schemas/administration/employee.schema';
import { PaymentMethodSchema } from './schemas/configuration/payment.method.schema';
import { OfficeSchema } from './schemas/administration/office.schema';

import { PurchaseTypeSchema } from './schemas/configuration/purchase.type.schema';
import { QuotationSchema } from './schemas/administration/quotation.schema';
import { PurchaseOrderSchema } from './schemas/administration/purchase.order.schema';

import { ProviderSchema } from './schemas/administration/provider.schema';
import { ProviderTypeSchema } from './schemas/configuration/provider.type.schema';
import { ItemTypeSchema } from './schemas/configuration/item.type.schema';
import { PositionSchema } from './schemas/configuration/position.schema';
import { ItemCommissionSchema } from './schemas/configuration/item.commission.schema';
import { NcfTypeSchema } from './schemas/configuration/ncf.type.schema';
import { FieldSchema } from './schemas/configuration/field.schema';
import { DebitNoteTypeSchema } from './schemas/configuration/debit.note.type.schema';
import { CreditNoteTypeSchema } from './schemas/configuration/credit.note.type.schema';

/**
 * ROUTES
 */
import { InvoiceRecurrencyRoute } from './routes/administration/invoice.recurrency.route';
import { InvoiceRoute } from './routes/administration/invoice.route';
import { AcknowledgmentRoute } from './routes/administration/acknowledgment.route';
import { PurchaseRoute } from './routes/administration/purchase.route';
import { StockRoute } from './routes/inventory/stock.route';
import { ManualEntryRoute } from './routes/administration/manual.entry.route';

import { TaxSchema } from './schemas/configuration/tax.schema';
import { BoxSchema } from './schemas/configuration/box.schema';
import { AccountSchema } from './schemas/configuration/account.schema';
import { AccountStatementSchema } from './schemas/configuration/account.statements';
import { ActiveBoxSchema } from './schemas/administration/active.box.schema';
import { AccountTypeSchema } from './schemas/administration/account.type.schema';
import { NcfController } from './controllers/administration/ncf.controller';
import { PaymentController } from './controllers/administration/payment.controller';
import { PaymentDepositController } from './controllers/administration/payment.deposit.controller';
import { CrebitNoteController } from './controllers/administration/credit.note.controller';
import { DebitNoteController } from './controllers/administration/debit.note.controller';

import { AccountEntryController } from './controllers/administration/account.entry.controller';

import { RoleSchema } from './schemas/security/role.schema';
import { COLLECTION_NAME_ENUM } from './utils/enums';
import { PackageConfigSchema } from './schemas/configuration/package.config.schema';
import { CurrencySchema } from './schemas/administration/currency.schema';
import { ItemSchema } from './schemas/administration/item.schema';

import { DocumentTypeSchema } from './schemas/configuration/document.type.schema';
import { InvoiceTypeSchema } from './schemas/configuration/invoice.type.schema';
import { ItemProcessSchema } from './schemas/configuration/item.process.schema';

import { PaymentRequestSchema } from './schemas/administration/payment.request.schema';

import { ConvertionRateSchema } from './schemas/administration/convertion.rate.schema';
import { NotificationSchema } from './schemas/administration/notification.schema';
import { join } from 'path';
import { Config } from './utils/utils';
import { AccountEntrySchema } from './schemas/administration/account.entry.schema';

import { WorkflowSchema } from './schemas/configuration/workflow.schema';
import { WorkflowProcessSchema } from './schemas/configuration/workflow.process.schema';
import { ApproveProcessRoute } from './routes/configuration/approve.process.route';

class AppServer{
    public app: any;
    private dbConfig:object;
    private sessionConfig: any;
    private port:number;
    private max_file_size: string;
    
    constructor(){
        let path = process.cwd(),
            config = Config();

        this.dbConfig = config['dbConfig'];
        this.sessionConfig = config['sessionConfig'];
        this.port = <number>config['port'];
        
        this.max_file_size = <string>config['max_file_size'] || '2mb';
        this.app = express();
        this.app.use( express.static( join( path, '/files' ) ) );
        this.config();
        this.services();
    }
    
    config(){
        this.app.use((req:any, res:any, next:any) => {
            next();
        });

        this.app.use(cors({
            origin: '*',
            methods: "GET,HEAD,POST,PUT,PATCH,DELETE",
            preflightContinue: false,
            optionsSuccessStatus: 204
        }));

        this.app.use('/api/v1', expressJwt({secret: this.sessionConfig.secret } ) );

        this.app.use(json({ limit: this.max_file_size }));
        this.app.use(urlencoded({limit:  this.max_file_size, extended: true}));
        let user = this.dbConfig['user'],
            pwd = this.dbConfig['password'],
            host: string = this.dbConfig['host'],
            db: string = this.dbConfig['dbName'],
            port:string = this.dbConfig['port'],
            ssl: boolean = !!this.dbConfig['ssl'],
            url =  `mongodb://${host}:${port}/${db}`;
        if(ssl){
            try{
                mongoose.connect( `mongodb://${user}:${pwd}@${host}:${port}/${db}?ssl=true&authSource=admin&replicaSet=Cluster0-shard-0`);
            }catch(e){
                console.log(e)
            }
        }
        else if(user && pwd ){
            mongoose.connect(url, {
                db: { 
                    native_parser: true 
                }, 
                user: user, 
                pass: pwd,
                useNewUrlParser: true
            });
        }
        else{
            mongoose.connect(url, { useNewUrlParser: true });
        }
    }
    
    services(){
        new SettingRoute(this.app);
        new UserRoute(this.app);
        
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.event_log, EventLogSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.module, ModuleSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.widget, WidgetSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.role, RoleSchema ));

        
        new InvoiceRecurrencyRoute(this.app);
        new InvoiceRoute(this.app);
        new PurchaseRoute(this.app);
        
        new AcknowledgmentRoute(this.app);
        new StockRoute(this.app);
        new ManualEntryRoute(this.app);
        new ApproveProcessRoute(this.app);

        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.client, ClientSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.employee, EmployeeSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.client_type, ClientTypeSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.payment_method, PaymentMethodSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.payment_request, PaymentRequestSchema, {
            code: 'SP'
        }));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.office, OfficeSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.purchase_type, PurchaseTypeSchema ));

        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.quotation, QuotationSchema, {
            code: 'C'
        } ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.purchase_order, PurchaseOrderSchema, {
            code: 'OC'
        } ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.provider, ProviderSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.provider_type, ProviderTypeSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.package_config, PackageConfigSchema));
        
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.tax, TaxSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.box, BoxSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.active_box, ActiveBoxSchema ));

        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.field, FieldSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.item_type, ItemTypeSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.item, ItemSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.ncf_type, NcfTypeSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.position, PositionSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.item_commission, ItemCommissionSchema ));
        
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.account_type, AccountTypeSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.account_entry, AccountEntrySchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.account, AccountSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.account_statements, AccountStatementSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.currency, CurrencySchema ));
        
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.document_type, DocumentTypeSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.invoice_type, InvoiceTypeSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.item_process, ItemProcessSchema ));

        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.notification,  NotificationSchema));

        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.convertion_rate, ConvertionRateSchema ));

        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.debit_note_type, DebitNoteTypeSchema ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.credit_note_type, CreditNoteTypeSchema ));

        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.workflow, WorkflowSchema, {
            code: 'WF'
        } ));
        new BaseRoute(this.app, new BaseController(null, COLLECTION_NAME_ENUM.workflow_process, WorkflowProcessSchema, {
            code: 'WP'
        } ));

        new BaseRoute(this.app, new CrebitNoteController());
        new BaseRoute(this.app, new DebitNoteController());
        
        new BaseRoute(this.app, new NcfController());
        new BaseRoute(this.app, new PaymentController());
        new BaseRoute(this.app, new PaymentDepositController());
        new BaseRoute(this.app, new AccountEntryController());

        this.app.use( (err:any, req:any, res:any, next:any) => {
            if (err.name === 'UnauthorizedError') {
                res.status(401).send('Su sessión ha expirado, favor inicio sessión.');
            }
            next();
        });
    }

    run(): any{
        let server =  this.app.listen(this.port, () =>{
           console.log(`Server running in port: ${this.port}`)
        });
        return server;
    }

    public static bootstrap(){
       return new AppServer().run();
    }
}

export const app = AppServer.bootstrap();