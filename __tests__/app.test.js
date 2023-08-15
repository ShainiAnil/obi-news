const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const request = require('supertest')
const testData = require('../db/data/test-data')
const jsEndpoints = require('../endpoints')

beforeEach(()=> seed(testData))

afterAll(()=> db.end())

describe('Get api/topics', ()=> {
    test ('Status code 200: has keys slug, description',()=> {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response)=> {
            const {topics} = response.body
            expect(topics).toHaveLength(3)
            topics.forEach((topic)=> {
                expect(topic).toHaveProperty('slug', expect.any(String))
                expect(topic).toHaveProperty('description', expect.any(String))
            })
        })
    })
    test('Status code 404 for bad route',()=>{
        return request(app)
        .get('/api/topic')
        .expect(404)
    })
})
describe('/api',()=>{
    test('Status 200: should return an object describing all the available endpoints on this API',()=>{
        return request(app)
        .get('/api')
        .expect(200)
        .then((response)=>{
            const endpoints = response.body
            expect(endpoints).toEqual(jsEndpoints)
        })
    })
    test('Status 200: /api should return an object having properties description, queries and exampleResponse',()=>{
        return request(app)
        .get('/api')
        .expect(200)
        .then((response)=>{
            const endpoints = response.body
            Object.values(endpoints).forEach(endpoint =>{
                expect(Object.keys(endpoint)).toHaveLength(4);
                expect(endpoint).toHaveProperty("description");
                expect(endpoint).toHaveProperty("queries");
                expect(endpoint).toHaveProperty("format");
                expect(endpoint).toHaveProperty("exampleResponse")
            })
           
        })
    })

})