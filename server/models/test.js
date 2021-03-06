//const kMeans = require('kmeans-js')
const _ = require('lodash')
let lg = console.log
const db = require('./db')
  //const grouping = require('../grouping')


let ctrds = [
  '2030513408',
  '2030513423',
  '2030513421',
  '2030513411',
  '2030513406',
  '2030513401'
]

let groupByCentroids = function(centroids, fn) {
  let _centroids = []
  let _tchFields = []
  let tchGroups = []

  let query = db.mentors.find({}, ['name', 'fields'], (err, mentors) => {

      for (let i = 0, ilen = mentors.length; i < ilen; i++) {
        _tchFields.push([mentors[i]._id, mentors[i].name, mentors[i].fields])
        _.forEach(centroids, c => {
          if (mentors[i]._id == c) {//将中心点导师的领域push进去
            _centroids.push(mentors[i].fields)
          }
        })
      }
      //lg(allFields)
      return Promise.resolve('centroids')
    })
    .then((pro) => {
      for (let i = 0; i < _tchFields.length; i++) {
        let min = Infinity
        let rec = 0
        let arr = []
        arr[i] = []
        let grouped = false
        for (let j = 0; j < _centroids.length; j++) {
          let _m = 1 - _.intersection(_tchFields[i][2], _centroids[j]).length / _.union(_tchFields[i][2], _centroids[j]).length
            //_m ? null : grouped = true
          _tchFields[i][0] == centroids[j] ? grouped = true : null //判断是否是centroids
          if (min > _m) {
            min = _m
            rec = j + 1
          }
          arr[i].push({
            rank: j + 1,
            value: _m.toFixed(4)
          })
        }
        arr[i].sort((a, b) => {
          return a.value - b.value
        })
        for (let k = 0; k < arr[i].length; k++) {
          arr[i][k] = arr[i][k].rank
        }
        tchGroups[i] = [arr[i], _tchFields[i][1], grouped]
      }

      _.forEach(tchGroups, (e, i) => {
        let min = 0
        let len = e[0].length
        let k
        _.forEach(e[0], (_e, _i) => {
          k = len - _i
          min += (_e - _i) * (_e - _i) * Math.pow(2, 2 * k)
        })
        e.push(min)
      })
      tchGroups.sort((a, b) => {
        return _.last(a) - _.last(b)
      })
      lg(tchGroups)
      
    })
}

let groups = groupByCentroids(ctrds)