'use strict'

const cli      = require('heroku-cli-util')
const co       = require('co')
const slugs    = require('../../lib/slugs');

function* run (context, heroku) {
  const exec = require('child_process').execSync

  const slug = yield slugs.FindByLatestOrId(
    heroku, context.app, context.args.slug_id)

  cli.log(slug.blob.url)
}

module.exports = {
  topic: 'slugs',
  command: 'url',
  description: 'gets the url to a slug',
  help: 'If SLUG_ID is not specified, returns the current slug.',
  args: [{name: 'slug_id', optional: true}],
  needsApp:  true,
  needsAuth: true,
  run: cli.command(co.wrap(run))
}
