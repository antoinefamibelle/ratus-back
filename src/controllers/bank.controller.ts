import { Request, Response } from 'express';
import axios from 'axios';
import { CustomRequest } from '../types/user.types';
import {
    BankListResponse,
    AgreementRequest,
    AgreementResponse,
    RequisitionRequest,
    RequisitionResponse,
    TokenResponse,
    RefreshTokenRequest,
} from '../types/bank.types';
import { db, bankAccounts, bankRequisitions } from '../db';

export class BankController {
    static async getBankList(req: Request, res: Response<BankListResponse>) {
        try {
            const response = await axios.get('https://bankaccountdata.gocardless.com/api/v2/institutions/', {
                params: {
                    country: 'fr'
                },
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${process.env.GOCARDLESS_ACCESS}`
                }
            });

            res.json({
                success: true,
                data: response.data,
                message: 'Banks list retrieved successfully'
            });
        } catch (error) {
            const err = error as Error;
            console.error(err);
            res.status(500).json({
                success: false,
                data: [],
                message: 'Error retrieving banks list',
                error: err.message
            });
        }
    }

    static async createAgreement(req: Request<{}, {}, AgreementRequest>, res: Response<AgreementResponse>) {
        try {
            const { institution_id } = req.body;
            const userId = (req as CustomRequest).userId;

            if (!institution_id) {
                return res.status(400).json({
                    success: false,
                    data: null,
                    message: 'Missing required fields',
                    error: 'institution_id is required'
                });
            }

            const response = await axios.post('https://bankaccountdata.gocardless.com/api/v2/agreements/enduser/', {
                institution_id,
                access_scope: ["balances", "details", "transactions"]
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GOCARDLESS_ACCESS}`
                }
            });

            res.json({
                success: true,
                data: response.data,
                message: 'Bank agreement created successfully'
            });
        } catch (error) {
            const err = error as Error;
            console.error(err);
            res.status(500).json({
                success: false,
                data: null,
                message: 'Error creating bank agreement',
                error: err.message
            });
        }
    }

    static async createRequisition(req: Request<{}, {}, RequisitionRequest>, res: Response<RequisitionResponse>) {
        try {
            const { institution_id, reference } = req.body;
            const userId = (req as CustomRequest).userId;

            const user_language = 'fr';
            const redirect = 'https://antoinefamibelle.fr/ratus-success';

            if (!institution_id || !reference) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields',
                    error: 'All fields are required: institution_id, reference'
                });
            }

            const response = await axios.post('https://bankaccountdata.gocardless.com/api/v2/requisitions/', {
                redirect,
                institution_id,
                reference,
                user_language
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GOCARDLESS_ACCESS}`
                }
            });

            // Save requisition to database
            await db.insert(bankRequisitions).values({
                userId: userId!,
                institutionId: institution_id,
                requisitionId: response.data.id,
                status: response.data.status,
                link: response.data.link,
                agreementId: response.data.agreement,
                reference: response.data.reference
            });

            res.json({
                success: true,
                data: response.data,
                message: 'Requisition created successfully'
            });
        } catch (error) {
            const err = error as Error;
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Error creating requisition',
                error: err.message
            });
        }
    }

    static async createToken(req: Request, res: Response<TokenResponse>) {
        try {
            const response = await axios.post('https://bankaccountdata.gocardless.com/api/v2/token/new/', {
                secret_id: process.env.GOCARDLESS_SECRET_ID,
                secret_key: process.env.GOCARDLESS_SECRET_KEY
            });

            res.json({
                success: true,
                token: response.data.access,
                message: 'Token created successfully'
            });
        } catch (error) {
            const err = error as Error;
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Error creating token',
                error: err.message
            });
        }
    }

    static async refreshToken(req: Request<{}, {}, RefreshTokenRequest>, res: Response<TokenResponse>) {
        try {
            const { refresh } = req.body;

            if (!refresh) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing refresh token',
                    error: 'Refresh token is required'
                });
            }

            const response = await axios.post('https://bankaccountdata.gocardless.com/api/v2/token/refresh/', {
                refresh
            });

            res.json({
                success: true,
                token: response.data.access,
                message: 'Token refreshed successfully'
            });
        } catch (error) {
            const err = error as Error;
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Error refreshing token',
                error: err.message
            });
        }
    }
}
