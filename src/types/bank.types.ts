export interface TokenResponse {
    success: boolean;
    token?: string;
    data?: any;
    message: string;
    error?: string;
}

export interface BankResponse {
    id: string;
    name: string;
    bic: string;
    transaction_total_days: string;
    countries: string[];
    logo: string;
    max_access_valid_for_days: string;
}

export interface BankListResponse {
    success: boolean;
    data: BankResponse[];
    message: string;
    error?: string;
}

export interface AgreementRequest {
    institution_id: string;
    max_historical_days: string;
    access_valid_for_days: string;
}

export interface AgreementResponse {
    success: boolean;
    data: any;
    message: string;
    error?: string;
}

export interface RequisitionRequest {
    redirect: string;
    institution_id: string;
    reference: string;
    agreement: string;
    user_language: string;
}

export interface RequisitionDataResponse {
    id: string;
    redirect: string;
    status: string;
    agreement: string;
    accounts: any[];
    reference: string;
    user_language: string;
    link: string;
}

export interface RequisitionResponse {
    success: boolean;
    data?: RequisitionDataResponse;
    message: string;
    error?: string;
}

export interface RefreshTokenRequest {
    refresh: string;
}

export interface BankAccount {
    id: string;
    userId: string;
    institutionId: string;
    requisitionId: string;
    status: string;
    accountId: string;
    agreementId: string;
    metadata?: any;
    createdAt: Date;
    updatedAt: Date;
}

export interface BankRequisition {
    id: string;
    userId: string;
    institutionId: string;
    requisitionId: string;
    status: string;
    link: string;
    agreementId: string;
    reference: string;
    createdAt: Date;
    updatedAt: Date;
}
