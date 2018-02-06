'use strict'

const cli      = require('heroku-cli-util')
const co       = require('co')
const releases = require('../../lib/releases');

function* run (context, heroku) {
  const rels = yield releases.GetReleases(heroku, context.app);

  cli.log(`Slugs in ${context.app}`)

  for (const r of rels.filter((r) => r.slug)) {
    cli.log(`v${r.version}: ${r.slug.id}`)
  }
}

module.exports = {
  topic: 'slugs',
  description: 'list recent slugs on application',
  needsAuth: true,
  needsApp: true,
  run: cli.command(co.wrap(run))
}
