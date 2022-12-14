const core = require('@actions/core');
const github = require('@actions/github');
const { runner } = require('graphql-schema-linter');

function lintSchemas(schemas) {
    const args = [null, __dirname, ...schemas];
    console.log("Linting schemas: ", schemas.join())
    return runner.run(process.stdout, process.stdin, process.stderr, args)
}
async function main() {
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
    try {
        const schemaFiles = core.getInput('files').split(',');
        const combined = core.getInput('combined');

        if (combined) {
            const exitCode = await lintSchemas(schemaFiles);
            if (exitCode !== 0) {
                throw new Error(`Invalid Schemas ${schemas}`);
            }
        } else {
            for (const schema of schemaFiles) {
                const exitCode = await lintSchemas([schema]);
                if (exitCode !== 0) {
                    throw new Error(`Invalid Schema ${schema}`);
                }
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}
main();
