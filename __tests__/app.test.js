const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const request = require('supertest')
const testData = require('../db/data/test-data')


beforeEach(()=> seed(testData))

afterAll(()=> db.end())

describe('Get api/topics', ()=> {
    test ('Status code 200: has keys slug, description',()=> {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response)=> {
            const {topics} = response.body
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