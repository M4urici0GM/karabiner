import rules from './rules';
import { writeFileToDisk } from './utils';
import { shouldReplaceConfig } from './input';
import { backupCurrentFile, createKarabinerFolder, getKarabinerConfigFile } from './fileUtils';

const entryPoint = async () => {
    const replaceConfig = await shouldReplaceConfig();
    const fileName = (replaceConfig)
        ? getKarabinerConfigFile()
        : "./karabiner.json";

    if (replaceConfig) {
        await createKarabinerFolder();
        await backupCurrentFile();
    }

    await writeFileToDisk(fileName, rules);
    console.log(`successfully written rules to file ${fileName}`);
}

entryPoint()
    .then(() => console.log('finished.'))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
