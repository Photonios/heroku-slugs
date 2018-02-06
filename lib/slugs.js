'use strict'

const releases = require('./releases')

const FindById = function (heroku, app, id) {
  return heroku.request({path: `/apps/${app}/slugs/${id}`})
}

const FindByLatest = function* (heroku, app) {
  const release = yield releases.FindByLatest(heroku, app)
  return FindById(heroku, app, release.slug.id)
}

const FindByLatestOrId = function (heroku, app, id) {
  return id ? FindById(heroku, app, id) : FindByLatest(heroku, app)
}

module.exports = {
  FindById,
  FindByLatest,
  FindByLatestOrId,
}
