from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/flask-react'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Post(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(260))
	body = db.Column(db.Text())
	date = db.Column(db.DateTime, default=datetime.datetime.now)

	def __init__(self, title, body):
		self.title = title
		self.body = body

	def __repr__(self):
		return '<Post {}>'.format(self.title)


class PostSchema(ma.Schema):
	class Meta:
		fields = ('id', 'title', 'body', 'date')


post_schema = PostSchema()
posts_schema = PostSchema(many=True)


@app.route('/get', methods=['GET'])
def get_posts():
	all_posts = Post.query.all()
	results = posts_schema.dump(all_posts)
	return jsonify(results)


@app.route('/get/<id>',methods=['GET'])
def post_detail(id):
	post = Post.query.get(id)
	return post_schema.jsonify(post)


@app.route('/add', methods=['POST'])
def add_post():
	title = request.json['title']
	body = request.json['body']

	posts = Post(title, body)
	db.session.add(posts)
	db.session.commit()
	return post_schema.jsonify(posts)


@app.route('/update/<id>', methods=['PUT'])
def update_post(id):
	post = Post.query.get(id)

	title = request.json['title']
	body = request.json['body']

	post.title = title
	post.body = body

	db.session.commit()
	return post_schema.jsonify(post)


@app.route('/delete/<id>', methods=['DELETE'])
def delete_post(id):
	post = Post.query.get(id)

	db.session.delete(post)
	db.session.commit()

	return post_schema.jsonify(post)


if __name__=='__main__':
	app.run(debug=True)
