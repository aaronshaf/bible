"use strict"

var lscache = require('lscache')

var cacheBucket = 'bible-'
var cacheTimeoutMinutes = 5

function normalizeKey(key) {
  if(typeof key !== 'string') {
    key = JSON.stringify(key)
  }
  return key
}

exports.get = function(key) {
  key = normalizeKey(key)
  lscache.setBucket(cacheBucket)
  return lscache.get(key)
}

exports.set = function(key,value) {
  key = normalizeKey(key)
  lscache.setBucket(cacheBucket)
  return lscache.set(key, value, cacheTimeoutMinutes)
}

exports.remove = function(key) {
  key = normalizeKey(key)
  return lscache.remove(key)
}
