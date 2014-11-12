Package.describe({
  name: 'tap:i18n',
  summary: 'A comprehensive internationalization solution for Meteor',
  version: '1.0.7',
  git: 'https://github.com/TAPevents/tap-i18n'
});

both = ['server', 'client'];
server = 'server';
client = 'client';

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.1');

  api.use('coffeescript', both);
  api.use('underscore', both);
  api.use('meteor', both);

  api.use('deps', client);
  api.use('session', client);
  api.use('jquery', client);
  api.use('templating', client);

  api.use('tap:http-methods@0.0.23', server);

  // load TAPi18n
  api.add_files('lib/globals.js', both);

  // load and init TAPi18next
  api.add_files('lib/tap_i18next/tap_i18next-1.7.3.js', both);
  api.export('TAPi18next');
  api.add_files('lib/tap_i18next/tap_i18next_init.js', both);

  api.add_files('lib/tap_i18n/tap_i18n-helpers.coffee', both);

  // We use the bare option since we need TAPi18n in the package level and
  // coffee adds vars to all (so without bare all vars are in the file level)
  api.add_files('lib/tap_i18n/tap_i18n-common.coffee', server);
  api.add_files('lib/tap_i18n/tap_i18n-common.coffee', client, {bare: true});

  api.add_files('lib/tap_i18n/tap_i18n-server.coffee', server);
  api.add_files('lib/tap_i18n/tap_i18n-client.coffee', client, {bare: true});

  api.export('TAPi18n');
});

Package._transitional_registerBuildPlugin({
  name: 'tap-i18n-compiler',
  use: ['coffeescript', 'underscore', 'aldeed:simple-schema', 'check', 'templating'],
  sources: [
    'lib/globals.js',

    'lib/plugin/etc/language_names.js',

    'lib/plugin/compiler_configuration.coffee',

    'lib/plugin/helpers/helpers.coffee',
    'lib/plugin/helpers/load_json.coffee',
    'lib/plugin/helpers/compile_step_helpers.coffee',

    'lib/plugin/compilers/i18n.coffee',
    'lib/plugin/compilers/project-tap.i18n.coffee',
    'lib/plugin/compilers/package-tap.i18n.coffee',
    'lib/plugin/compilers/i18n.json.coffee'
  ]
});
