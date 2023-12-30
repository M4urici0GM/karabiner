import rules from './rules';
import { writeFileToDisk } from './utils';
import { shouldReplaceConfig } from './input';
import { backup_file, create_recursive, get_karabiner_config_file } from './fileUtils';

const entryPoint = async () => {
    const replaceConfig = await shouldReplaceConfig();
    const fileName = (replaceConfig)
        ? get_karabiner_config_file()
        : "./karabiner.json";

    if (replaceConfig) {
        await create_recursive();
        await backup_file();
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
