'use strict'

const GetReleases = function (heroku, app, search, partial) {
  const request = {
    path: `/apps/${app}/releases`,
    partial: !!partial,
    headers: {'Range': 'version ..; max=10, order=desc'}
  }

  return heroku.request(request)
    .then(r => r.filter(release => release.slug))
}

const FindByLatest = function* (heroku, app) {
  const releases = yield GetReleases(heroku, app, true)
  return releases[0];
}

module.exports = {
  GetReleases,
  FindByLatest,
}
