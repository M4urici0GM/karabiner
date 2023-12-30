import fs, { constants } from 'fs/promises';
import path from 'path';


/**
  * Gets current user folder.
  * Same as ~/
  **/
const getHome = () => {
    const userHome = process.env['HOME'];
    if (!userHome) {
        throw new Error('environment variable HOME is not defined.');
    }

    return userHome;
}

/**
  * Checks whether file exists for a given path.
  **/
const fileExists = async (fileName: string): Promise<boolean> => {
    try {
        await fs.access(fileName, constants.R_OK);
        return true;
    } catch (err) {
        return false;
    }
}

/**
  * Gets karabiner folder.
    * same as ~/.config/karabiner/
  **/
export const getKarabinerFolder = () => path.join(getHome(), '.config', 'karabiner');

/**
  * Gets karabiner config file path.
  * same as ~/.config/karabiner/karabiber.json
  **/
export const getKarabinerConfigFile = () => path.join(getKarabinerFolder(), "karabiner.json");


/**
  * Recursively creates karabiner config folder.
  * same as mkdir -p ~/.config/karabiner/karabiber.json
  **/
export const createKarabinerFolder = () => fs.mkdir(getKarabinerFolder(), { recursive: true });

/**
  * Moves current config file to a new one.
  * same as mv ~/.config/karabiner/karabiner.json ~/.config/karabiner/karabiner-$(date "+%Y-%m-%dT%H-%M-%S").json
  **/
export const backupCurrentFile = async () => {
    const fileName = getKarabinerConfigFile();
    const folderName = getKarabinerFolder();
    if (await fileExists(fileName)) {
        const currentDate = new Date().toISOString().slice(0, 19).replace(/\:/g, '-');
        const backFileName = path.join(folderName, `karabiner-${currentDate}.json`);
        console.log(`moving file ${fileName} to ${backFileName}`);

        await fs.rename(fileName, backFileName);
    }
}


