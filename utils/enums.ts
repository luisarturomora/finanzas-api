export enum USER_STATUS_ENUM {
    actived = 'Activo',
    inactive = 'Inactivo'
}

export enum QUOTATION_STATUS_ENUM {
    created = 'Creada',
    canceled = 'Cancelada',
    invoiced = 'Facturada'
}

export enum PURCHASE_ORDER_STATUS_ENUM {
    created = 'Creada',
    canceled = 'Cancelada',
    invoiced = 'Facturada'
}

export enum MANUAL_ENTRY_STATUS_ENUM{
    create = 'En Digitación',
    approving = 'Pendiente Aprobación',
    approved = 'Aprobado',
    rejected = 'Rechazado'
};

export enum EVENT_LOG_ENUM {
    signIn = 'Iniciar Sesión',
    passwordChange = 'Cambiar contraseña',
    filter = 'Filtrar',
    update = 'Actualizar',
    delete = 'Borrar',
    save = 'Guardar',
    details = 'Detalle',
    list = 'Listado',
    cancel = 'Cancelado',
    approved = 'Aprobado',
    rejected = 'Rechazado'
}

export enum PURCHASE_STATUS_ENUM {
    created = 'Creada',
    canceled = 'Cancelada',
    returned = 'Devolución',
    payed = 'Pagada'
}

export enum PACKAGE_STATUS_ENUM {
    created = 'Creada',
    canceled = 'Cancelada',
    returned = 'Devolución',
    payed = 'Pagada'
}

export enum INVOICE_STATUS_ENUM {
    Created = 'Creada',
    PartialPayment = 'Pago Parcial',
    Canceled = 'Cancelada',
    Returned = 'Devolución',
    Payed = 'Pagada'
}

export enum PURCHASE_STATUS_ENUM {
    Created = 'Creada',
    PartialPayment = 'Pago Parcial',
    Canceled = 'Cancelada',
    Returned = 'Devolución',
    Payed = 'Pagada'
}

export enum SERVICE_STATUS_ENUM {
    active = 'Activo',
    finished = 'Finalizado'
}

export enum PAYMENT_TYPE_ENUN {
    credit = 'Credito',
    counted = 'Contado'
}

export enum PAYMENT_STATUS_ENUN {
    created = 'Creado',
    deposited = 'Depositado',
    returned = 'Devolución'
}
export enum PAYMENT_DEPOSIT_STATUS_ENUN {
    created = 'Creado',
    cancelled = 'Cancelado'
}

export enum STOCK_TYPE_ENUM{
    in = 'in',
    out = 'out'
}

export enum COLLECTION_NAME_ENUM{
    item = 'item',
    item_type = 'item_type',
    stock = 'stock',
    user = 'user',
    role = 'role',
    module = 'module',
    widget = 'widget',
    package = 'package',
    event_log = 'event_log',
    client = 'client',
    employee = 'employee',
    client_type = 'client_type',
    payment = 'payment',
    payment_deposit = 'payment_deposit',
    payment_method = 'payment_method',
    payment_request = 'payment_request',
    office = 'office',
    purchase_type = 'purchase_type',
    quotation = 'quotation',
    provider = 'provider',
    provider_type = 'provider_type',
    package_config = 'package_config',
    tax = 'tax',
    box = 'box',
    active_box = 'active_box',
    field = 'field',
    ncf = 'ncf',
    ncf_type = 'ncf_type',
    notification = 'notification',
    position = 'position',
    item_commission = 'item_commission',
    invoice_recurrency = 'invoice_recurrency',
    invoice = 'invoice',
    purchase = 'purchase',
    purchase_order = 'purchase_order',
    setting = 'setting',
    account_type = 'account_type',
    account = 'account',
    account_statements = 'account_statements',
    currency = 'currency',
    document_type = 'document_type',
    invoice_type = 'invoice_type',
    debit_note_type = 'debit_note_type',
    credit_note_type = 'credit_note_type',
    item_process = 'item_process',
    convertion_rate = 'convertion_rate',
    acknowledgment = 'acknowledgment',
    credit_note = 'credit_note',
    debit_note = 'debit_note',
    account_entry = 'account_entry',
    entry_message = 'entry_message',
    workflow = 'workflow',
    workflow_process = 'workflow_process',
    approve_process = 'approve_process',
    manual_entry = 'manual_entry',
    manual_entry_old = 'manual_entry_old'
}

export enum FREQUENCY_TYPE_ENUM{
    hour = 'Hora',
    day = 'Dia',
    week = 'Semana',
    month = 'Mes',
    year = 'Año'
}

export enum NCF_STATUS_ENUM{
    active = 'Activo',
    used = 'Usado'
}