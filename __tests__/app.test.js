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
describe("/api/articles/:article_id", () => {
    test("should respond with 200 and an article object", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
             const article = body.article;
             expect(article).toEqual({
                article_id: 1,
                title: "Living in the shadow of a great man", 
                author: "butter_bridge", 
                body:"I find this existence challenging", 
                topic: "mitch", 
                created_at: "2020-07-09T20:11:00.000Z", 
                votes: 100, 
                article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
            });
        });
    })
    test("Status 404 : responds with a 404 error and an error message when a valid id which does not exist is given",()=>{
        return request(app).get("/api/articles/999")
        .expect(404)
        .then(response =>{
            expect(response.body.msg).toBe("No article found for article_id:999")
        })
    })
    test("Status 400 : responds with a 400 error and an error message when given an invalid id",()=>{
        return request(app).get("/api/articles/notAnId")
        .expect(400)
        .then(response =>{
            expect(response.body.msg).toBe("Bad request")
        })
    })
})