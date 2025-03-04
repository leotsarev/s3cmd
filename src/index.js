const core = require('@actions/core');
const homedir = require('os').homedir();
const path = require('path').join(homedir, '.s3cfg')
const { execSync } = require('child_process');
const { createWriteStream } = require('fs')
const { providers, makeConf } = require('./providers')

try {
  execSync("/bin/bash -c 'pip3 install s3cmd --no-cache --break-system-packages'")
} catch {
  execSync("/bin/bash -c 'pip3 install s3cmd --no-cache'")
}

const provider = providers[core.getInput('provider')];

core.info("Provider: " + provider);

core.info(providers[core.getInput('provider')]);

const conf = makeConf(providers[core.getInput('provider')]({
  region: core.getInput("region"),
  account_id: core.getInput("account_id"),
  access_key: core.getInput("access_key"),
  secret_key: core.getInput("secret_key"),
}))

const writer = createWriteStream(path)

for (const line of conf) {
  writer.write(line + '\r\n')
}

return 0
