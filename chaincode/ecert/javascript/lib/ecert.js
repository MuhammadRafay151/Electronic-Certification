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
                email:"muhammadrafay151@gmail.com",
                Name:"Muhammad Rafay",
                Title:"Js-Certifications",
                description:"xyz",
                Organizations:"Uit",
               
                
            },
            
        ];

        for (let i = 0; i < Certificates.length; i++) {
            Certificates[i].docType = 'certificate';
            await ctx.stub.putState('ecert' + i, Buffer.from(JSON.stringify(Certificates[i])));
            console.info('Added <--> ', Certificates[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCertificates(ctx, CertificateNumber) {

        const CertificateAsBytes = await ctx.stub.getState(CertificateNumber); // get the certificates from chaincode state
        if (!CertificateAsBytes|| CertificateAsBytes.length === 0) {
            throw new Error(`${CertificateNumber} does not exist`);
        }
        console.log(CertificateAsBytes.toString());
        return CertificateAsBytes.toString();
    }

    async createCertificate(ctx,key,json){
        console.info('============= START : Create Certificate ===========');
        
        await ctx.stub.putState(key, Buffer.from(json));
        console.info('============= END : Certificate created ===========');
    }

    async queryAllCertificates(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

}

module.exports = ecert
