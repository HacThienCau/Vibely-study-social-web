require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const path = require('path');
const fs = require('fs');

let app;
let token;
const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: '123456',
    gender: 'male',
    dateOfBirth: '2000-01-01'
};
const newPassword = "newPassword"
let postId;
let commentId;
let replyId;
let storyId;

beforeAll(async () => {
  app = await require('./index'); // 👈 Chờ connectDb xong
}, 15000);

afterAll(async () => {
  await mongoose.connection.close();
}, 10000);

describe('Test API', () => {
// AUTH API
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
  }, 15000);

  it('should login and return a token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('token');
    token = res.body.data.token;
  }, 15000);

  it('should change password', async () => {
    const res = await request(app)
      .post('/auth/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({ oldPassword: testUser.password, newPassword: newPassword })

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch('Đổi mật khẩu thành công');
  }, 10000);

  it('should log out', async () => {
    const res = await request(app)
      .get('/auth/logout')

    expect(res.statusCode).toBe(200);
  }, 15000);

  it('should login with new password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: newPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('token');
    token = res.body.data.token;
  }, 15000);
//POST API
  it('should get all posts', async () => {
    const res = await request(app)
      .get('/users/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  }, 10000);

  it('should get a specific posts', async () => {
    const postId = '67f1f3619770f384e8308e15'; // id bài viết của bạn P
    const res = await request(app)
      .get(`/users/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  }, 10000);

  it('should get posts from specific account', async () => {
    const id = '67eb68f2b6eaf959905512e3';  // id của HacThienCau :))
    const res = await request(app)
      .get(`/users/posts/user/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  }, 10000);

  it('should create new post', async () => {
    const res = await request(app)
      .post('/users/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: "Test API" });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('_id');
    postId = res.body.data._id;
  }, 15000);

  it('should edit the post', async () => {
    const res = await request(app)
      .put(`/users/posts/edit/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: "Edited content", flag: 0 });

    expect(res.statusCode).toBe(201);
  }, 15000);

  it('should react to the post', async () => {
    const res = await request(app)
      .post(`/users/posts/reacts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ type: "haha" });

    expect(res.statusCode).toBe(200);
  }, 15000);

  it('should comment to the post', async () => {
    const res = await request(app)
      .post(`/users/posts/comments/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ text: "Test comment" });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('comments');
    expect(Array.isArray(res.body.data.comments)).toBe(true);

    const comments = res.body.data.comments;
    commentId = comments[comments.length - 1]._id; // lấy comment cuối cùng

    expect(commentId).toBeDefined();
  }, 15000);

  it('should like the comment', async () => {
    const res = await request(app)
      .post(`/users/posts/reactComment/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ commentId });

    expect(res.statusCode).toBe(201);
  }, 15000);

  it('should reply to the comment', async () => {
    const res = await request(app)
      .post(`/users/posts/reply/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ commentId, replyText: "Test reply" });

      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('comments');  
      const comments = res.body.data.comments;
      const targetComment = comments.find(c => c._id === commentId);  
      expect(targetComment).toBeDefined();
      expect(Array.isArray(targetComment.replies)).toBe(true);
  
      const replies = targetComment.replies;
      const newReply = replies[replies.length - 1];
      replyId = newReply._id;
  
      expect(replyId).toBeDefined();
  }, 15000);

  it('should delete the reply i have just created', async () => {
    const res = await request(app)
      .delete(`/users/posts/deleteReply/${postId}/${commentId}/${replyId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  }, 10000);

  it('should delete the comment i have created', async () => {
    const res = await request(app)
      .delete(`/users/posts/deleteComment/${postId}/${commentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  }, 10000);

  it('should share the post', async () => {
    const res = await request(app)
      .post(`/users/posts/share/${postId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
  }, 15000);

  it('should delete the post i have just created', async () => {
    const res = await request(app)
      .delete(`/users/posts/deletePost/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  }, 10000);
//STORY API
    it('should get all stories', async () => {
    const res = await request(app)
      .get('/users/story')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  }, 10000);

  it('should create a new story with an image', async () => {
    const filePath = path.join(__dirname, 'uploads/sample.png');

    const res = await request(app)
        .post('/users/story') // hoặc đường dẫn API thực tế
        .set('Authorization', `Bearer ${token}`)
        .attach('media', filePath); // tên field phải trùng với tên trong `multer.single('file')`

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('mediaUrl');
    expect(res.body.data.mediaType).toBe('image');
    expect(res.body.data).toHaveProperty('_id');
    storyId = res.body.data._id;
    });

    it('should react to the story', async () => {
    const res = await request(app)
      .post(`/users/story/reacts/${storyId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ type: "tym" });

    expect(res.statusCode).toBe(200);
  }, 15000);

  it('should delete the story i have just created', async () => {
    const res = await request(app)
      .delete(`/users/posts/deleteStory/${storyId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  }, 10000);

  it('should delete account', async () => {
    const res = await request(app)
      .delete('/auth/deleteAccount')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  }, 10000);
});
