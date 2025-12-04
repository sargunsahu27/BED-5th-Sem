const mongoose = require('mongoose');
let {MongoMemoryServer} = require('mongodb-memory-server');
let User=require('./model/user.model');
const request = require('supertest');
const app = require('./server');
let mongoServer;
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    let mongoUrl=mongoServer.getUri();
    await mongoose.connect(mongoUrl);
    
}); 
afterEach(async () => {
    // Clear all data after each test
    await User.deleteMany({});
});
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});



describe ("POST /api/users/register",()=>{
    

    it("should return user already exist if email is sargun@gmail.com",async()=>{
        await User.create({
            name:"bhhgbn",
            email:"sargun@gmail.com",
            password:"sargun123"
        });
        let response=await request(app)
        .post("/api/users/register")
        .send({
            name:"Sargun",
            email:"sargun@gmail.com",
            password:"sargun123"
        })
        expect(response.body.message).toBe("User already exists");
    })
    it("should register user successfully if email is not registered",async()=>{
        let response=await request(app)
        .post("/api/users/register")
        .send({
            name:"Sargun",
            email:"sargun@gmail.com",
            password:"sargun123"
        })
        expect(response.body.message).toBe("User registered successfully");
    })






});

       