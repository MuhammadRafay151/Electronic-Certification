/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class ecert extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const Certificates = [
            {
                email: 'muhammadrafay151@gmail.com',
                Name: 'Muhammad Rafay',
                Title: 'Js-Certifications',
                description: 'xyz',
                Organizations: 'Uit',


            },

        ];

        for (let i = 0; i < Certificates.length; i++) {
            Certificates[i].docType = 'certificate';
            await ctx.stub.putState('ecert' + i, Buffer.from(JSON.stringify(Certificates[i])));
            console.info('Added <--> ', Certificates[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async QueryCertificate(ctx, CertificateNumber) {
        const CertificateAsBytes = await ctx.stub.getState(CertificateNumber); // get the certificates from chaincode state
        if (!CertificateAsBytes || CertificateAsBytes.length === 0) {
            throw new Error(`${CertificateNumber} does not exist`);
        }
        //console.log(CertificateAsBytes.toString());
        return CertificateAsBytes.toString();
    }
    async PublishCertificate(ctx, data) {
        console.info('============= START : Create Certificate ===========');
        data = JSON.parse(data);
        //if(!data._id){throw new Error("id for the resource is not mentioned")}
        let key = data._id;
        delete data._id;
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(data)));
        console.info('============= END : Certificate created ===========');
    }
    async PublishBatch(ctx, data) {
        let batch = JSON.parse(data);
        for (let x = 0; x < batch.length; x++) {
            let key = batch[x]._id;
            delete batch[x]._id;
            await ctx.stub.putState(key, Buffer.from(JSON.stringify(batch[x])))
        }
    }


}
module.exports = ecert;
