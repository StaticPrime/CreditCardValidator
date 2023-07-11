import chai from 'chai'
import chaiHttp from 'chai-http'
import { host, port } from 'config/env'

const should = chai.should()
chai.use(chaiHttp)

interface CreditCards {
    AmericanExpress: string,
    MasterCard: string,
    Visa: string,
    Discover: string
}

const ValidTestCreditCards: CreditCards = {
    AmericanExpress: '374245455400126',
    MasterCard: '5425233430109903',
    Visa: '4263982640269299',
    Discover: '60115564485789458'
}

const InvalidTestCreditCards: CreditCards = {
    AmericanExpress: '374245455400123',
    MasterCard: '5425233430109902',
    Visa: '4263982640269297',
    Discover: '60115564485789450'
}

describe('POST /validate', () => {
    describe('Invalid Card Length (too short)', () => {
        it('should reject a credit card whose length is too short', (done) => {
            chai.request(`http://${host}:${port}`)
                .post('/validate')
                .send({ cc_number: '123' })
                .end((err, res) => {
                    res.should.have.status(400)
                    done()
                })
        })
    })
    describe('Invalid Card Length (too long)', () => {
        it('should reject a credit card whose length is too long', (done) => {
            chai.request(`http://${host}:${port}`)
                .post('/validate')
                .send({ cc_number: '12345678901234567890' })
                .end((err, res) => {
                    res.should.have.status(400)
                    done()
                })
        })
    })
    describe('No Credit Card Sent (empty body)', () => {
        it('should reject if there is no credit card number supplied', (done) => {
            chai.request(`http://${host}:${port}`)
                .post('/validate')
                .send({})
                .end((err, res) => {
                    res.should.have.status(400)
                    done()
                })
        })
    })
    describe('No Credit Card Sent (number blank)', () => {
        it('should reject if there is no credit card number supplied', (done) => {
            chai.request(`http://${host}:${port}`)
                .post('/validate')
                .send({ cc_number: '' })
                .end((err, res) => {
                    res.should.have.status(400)
                    done()
                })
        })
    })
    describe('Valid American Express Card', () => {
        it('should validate a correct American Express Card', (done) => {
            chai.request(`http://${host}:${port}`)
                .post('/validate')
                .send({ cc_number: ValidTestCreditCards.AmericanExpress })
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
    })
    describe('Invalid American Express Card', () => {
        it('should reject the invalid American Express Card', (done) => {
            chai.request(`http://${host}:${port}`)
                .post('/validate')
                .send({ cc_number: InvalidTestCreditCards.AmericanExpress })
                .end((err, res) => {
                    res.should.have.status(400)
                    done()
                })
        })
    })
    describe('Valid Master Card', () => {
        it('should validate a correct Master Card', (done) => {
            chai.request(`http://${host}:${port}`)
                .post('/validate')
                .send({ cc_number: ValidTestCreditCards.MasterCard })
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
    })
    describe('Invalid Master Card', () => {
        it('should reject the invalid Master Card', (done) => {
            chai.request(`http://${host}:${port}`)
                .post('/validate')
                .send({ cc_number: InvalidTestCreditCards.MasterCard })
                .end((err, res) => {
                    res.should.have.status(400)
                    done()
                })
        })
    })
    describe('Valid Visa Card', () => {
        it('should validate a correct Visa Card', (done) => {
            chai.request(`http://${host}:${port}`)
                .post('/validate')
                .send({ cc_number: ValidTestCreditCards.Visa })
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
    })
    describe('Invalid Visa Card', () => {
        it('should reject the invalid Visa Card', (done) => {
            chai.request(`http://${host}:${port}`)
                .post('/validate')
                .send({ cc_number: InvalidTestCreditCards.Visa })
                .end((err, res) => {
                    res.should.have.status(400)
                    done()
                })
        })
    })
    describe('Valid Discover Card', () => {
        it('should validate a correct Discover Card', (done) => {
            chai.request(`http://${host}:${port}`)
                .post('/validate')
                .send({ cc_number: ValidTestCreditCards.Discover })
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
    })
    describe('Invalid Discover Card', () => {
        it('should reject the invalid Discover Card', (done) => {
            chai.request(`http://${host}:${port}`)
                .post('/validate')
                .send({ cc_number: InvalidTestCreditCards.Discover })
                .end((err, res) => {
                    res.should.have.status(400)
                    done()
                })
        })
    })
})