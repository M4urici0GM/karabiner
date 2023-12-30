import readline from 'readline';

const MESSAGE = "should i replace your current karabiner.json? (it will make a backup from current) [y/N]: ";
export const askUser = (question: string): Promise<string> => {
    const { stdin, stdout } = process;
    const input = readline.createInterface({ input: stdin, output: stdout });

    return new Promise((resolve, _) => {
        input.question(question, answer => {
            input.close();
            resolve(answer);
        });
    })
}

export const shouldReplaceConfig = async () => {
    const answer = await askUser(MESSAGE);
    return !!answer && (answer.toUpperCase().startsWith('Y'));
}


