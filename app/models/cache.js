"use strict"

var lscache = require('lscache')

var cacheBucket = 'bible-'
var cacheTimeoutMinutes = 5
var cacheInMemory = {}

function normalizeKey(key) {
  if(typeof key !== 'string') {
    key = JSON.stringify(key)
  }
  return key
}

exports.get = function(key) {
  key = normalizeKey(key)
  if(cacheInMemory[key]) {
    return cacheInMemory[key]
  }
  lscache.setBucket(cacheBucket)
  return lscache.get(key)
}

exports.set = function(key,value) {
  key = normalizeKey(key)
  cacheInMemory[key] = value
  if(Object.keys(cacheInMemory).length > 150) {
    cacheInMemory = cacheInMemory.slice(0,150)
  }
  lscache.setBucket(cacheBucket)
  return lscache.set(key, value, cacheTimeoutMinutes)
}

exports.remove = function(key) {
  key = normalizeKey(key)
  delete cacheInMemory[key]
  return lscache.remove(key)
}
