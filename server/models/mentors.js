/*
*创建mentorsMode即导师表格
*/
var mongoose = require('./mongodb')
var Schema = mongoose.Schema

var students = require('./students').students
var topics = require('./topics').topics
var groups = require('./groups').groups

var mentorsSchema = new Schema
({
	_id: 			{type:  String, index: 1, required: true, unique: true},//工号
	name: 			{type:  String, required: true},//姓名
	password: 		{type:  String, required: true},//密码 required表示一开始存数据的时候就要有
	tel: 			{type:  String}, //电话
	email: 			{type:  String},//邮箱
	students: 		[{type: String, ref: 'students'}],//指导的学生
	studentsscore:  {type: [Number]},//给每个学生打的分数
	group: 			{type:  Number, ref: 'groups'},//答辨所在的分组
    topics:         [{type: Number, ref: 'topics'}], //导师所出的题
    fields: 		{type: [String]}, //研究方向
    office:         {type: String}//办公室地址
},{colletion: 'mentors' })

const mentors = mongoose.model('mentors',mentorsSchema)
exports.mentors = mentors
