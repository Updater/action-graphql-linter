const core = require('@actions/core');
const { runner } = require('graphql-schema-linter');
const fs = require('fs');
const path = require('path');

function lintSchemas(schemas) {
    const args = [
        null,
        __dirname,
        ...schemas
    ];
    console.log(fs.readFileSync(path.join(__dirname, schemas[0])).toString());
    console.log('Linting schemas: ', schemas.join())
    return runner.run(process.stdout, process.stdin, process.stderr, args)
}

async function main() {
    console.log(process.argv)
    try {
        const schemaFiles = core.getInput('files').split(',');
        const combined = core.getInput('combined');

        if (combined.toLowerCase() === 'true') {
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
