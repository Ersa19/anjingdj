const axios = require('axios');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function getTimeStamp() {
    const date = new Date();
    return `[${date.toLocaleString()}] `;
}

const getQueryIdsFromFile = async () => {
    try {
        const filePath = path.join(__dirname, 'hash.txt');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return fileContent.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
        console.error(getTimeStamp() + 'Error reading hash.txt:', error);
        throw error;
    }
};

const makeRequestWithRetry = async (requestFunction, retries = 5) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await requestFunction();
        } catch (error) {
            if (attempt === retries) {
                console.error(getTimeStamp() + 'Max retries reached. Giving up.');
                throw error;
            }
            await delay(2000); // 2 seconds delay between retries
        }
    }
};

const tap = async (authorization, clicks) => {
    const url = 'https://api.djdog.io/pet/tap';
    const response = await axios.post(url, null, {
        headers: { Authorization: authorization },
        params: { clicks: clicks }
    });
    return response.data.data;
};

const getBarAmount = async authorization => {
    const url = 'https://api.djdog.io/pet/barAmount';
    const response = await axios.get(url, {
        headers: { Authorization: authorization }
    });
    return response.data.data;
};

const getBoxMall = async authorization => {
    const url = 'https://api.djdog.io/pet/boxMall';
    const response = await axios.get(url, {
        headers: { Authorization: authorization }
    });
    return response.data.data;
};

const checkTasks = async authorization => {
    const url = 'https://api.djdog.io/task/list';
    const response = await axios.get(url, {
        headers: { Authorization: authorization }
    });
    return response.data.data.taskDetails;
};

const finishTask = async (authorization, taskId) => {
    const url = `https://api.djdog.io/task/finish?taskIds=${taskId}`;
    const response = await axios.post(url, null, {
        headers: { Authorization: authorization }
    });
    return response.data;
};

const levelUp = async authorization => {
    const url = 'https://api.djdog.io/pet/levelUp/1';
    const response = await axios.post(url, null, {
        headers: { Authorization: authorization }
    });
    return response.data.returnCode === 200 ? 'Success' : '\x1b[31mFailed\x1b[0m';
};

const askQuestion = question => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => rl.question(question, answer => {
        rl.close();
        resolve(answer);
    }));
};

const processAccount = async (accountId, autoClearTasks, autoMaxLevelUp) => {
    try {
        // Simulate obtaining token, replace with real logic if needed
        const accessToken = accountId; // Assuming accountId is the token for simplicity
        const telegramUsername = 'testuser'; // Placeholder

        console.log(getTimeStamp() + 'Processing account:', telegramUsername);
        await delay(1000);

        if (autoMaxLevelUp) {
            const levelUpStatus = await levelUp(accessToken);
            console.log(getTimeStamp() + 'Level Up Status:', levelUpStatus);
            await delay(1000);
        }

        if (autoClearTasks) {
            const tasks = await checkTasks(accessToken);
            for (const task of tasks) {
                if (!task.finished) {
                    try {
                        const finishStatus = await finishTask(accessToken, task.taskId);
                        const statusMessage = finishStatus.returnCode === 200 ? 'Success' : 'Failed';
                        console.log(getTimeStamp() + `Task ${task.taskId} (${task.taskName}) - ${statusMessage}`);
                    } catch (error) {
                        console.error(getTimeStamp() + `Error finishing task ${task.taskId}:`, error);
                    }
                    await delay(1000);
                }
            }
        }

        while (true) {
            const clicks = Math.floor(Math.random() * (432 - 131 + 1)) + 131;
            const tapResult = await tap(accessToken, clicks);
            await delay(1000);

            const barAmount = await getBarAmount(accessToken);
            await delay(1000);

            const boxMall = await getBoxMall(accessToken);
            await delay(1000);

            console.log(getTimeStamp() + `Tap Result: ${tapResult.goldAmount}, Box Mall Level: ${boxMall.level}, Available Amount: ${boxMall.availableAmount}, Bar Amount: ${barAmount.availableAmount}/${barAmount.maxAmount}`);
            if (barAmount.availableAmount < 50) break;
        }
    } catch (error) {
        console.error(getTimeStamp() + 'Error processing account', accountId, error);
    }
};

const main = async () => {
    try {
        const accountIds = await getQueryIdsFromFile();
        const autoClearTasks = await askQuestion('Auto Clear Task (y/n)? ').then(answer => answer.toLowerCase() === 'y');
        const autoMaxLevelUp = await askQuestion('Auto Max Level Up (y/n)? ').then(answer => answer.toLowerCase() === 'y');

        while (true) {
            for (const accountId of accountIds) {
                await processAccount(accountId, autoClearTasks, autoMaxLevelUp);
            }
            console.log('All accounts processed, waiting for 30 minutes...');
            await delay(1800000); // 30 minutes
        }
    } catch (error) {
        console.error(getTimeStamp() + 'Error:', error);
    }
};

main();
