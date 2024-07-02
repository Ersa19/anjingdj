const axios = require('axios'),
    fs = require('fs'),
    path = require('path'),
    readline = require('readline'),
    delay = _0x5d46b0 => new Promise(_0x1abe96 => setTimeout(_0x1abe96, _0x5d46b0));

function _0x4b2d(_0x175575, _0x56ef17) {
    const _0x2b701f = _0x2b70();
    return _0x4b2d = function (_0x4b2d4f, _0x1b3bd9) {
        _0x4b2d4f = _0x4b2d4f - 0xf3;
        let _0x114532 = _0x2b701f[_0x4b2d4f];
        return _0x114532;
    }, _0x4b2d(_0x175575, _0x56ef17);
}

function getTimeStamp() {
    const _0x5aa3c7 = _0x21005e,
        _0xc95ef7 = new Date();
    return _0x5aa3c7(0x10e) + _0xc95ef7['toLocaleString']() + _0x5aa3c7(0x120);
}

const getQueryIdsFromFile = async () => {
    const _0x5ee42a = _0x21005e;
    try {
        const _0xd199ee = path[_0x5ee42a(0x136)](__dirname, _0x5ee42a(0x10a)),
            _0x10a02d = fs[_0x5ee42a(0xf3)](_0xd199ee, _0x5ee42a(0x114));
        return _0x10a02d[_0x5ee42a(0x117)]('\x0a')[_0x5ee42a(0x107)](_0x9c3556 => _0x9c3556[_0x5ee42a(0x12a)]() !== '');
    } catch (_0x43a0e4) {
        console[_0x5ee42a(0x128)](getTimeStamp() + _0x5ee42a(0x12d), _0x43a0e4);
        throw _0x43a0e4;
    }
};

makeRequestWithRetry = async (_0x2940d5, _0x39a17b = 0x5) => {
    const _0x3c47d4 = _0x21005e;
    for (let _0x1036e2 = 0x1; _0x1036e2 <= _0x39a17b; _0x1036e2++) {
        try {
            return await _0x2940d5();
        } catch (_0xda4b81) {
            if (_0x1036e2 === _0x39a17b) {
                console[_0x3c47d4(0x128)](getTimeStamp() + _0x3c47d4(0x124));
                throw _0xda4b81;
            }
            await delay(0x7d0);
        }
    }
};

tap = async (_0x84d5f2, _0x3cb019) => {
    return makeRequestWithRetry(async () => {
        const _0x221f25 = _0x4b2d,
            _0x69a85b = _0x221f25(0x111),
            _0x310878 = await axios['post'](_0x69a85b, null, {
                'headers': {
                    'Authorization': _0x84d5f2
                },
                'params': {
                    'clicks': _0x3cb019
                }
            });
        return _0x310878[_0x221f25(0xf5)][_0x221f25(0xf5)];
    });
};

getBarAmount = async _0x1a3817 => {
    return makeRequestWithRetry(async () => {
        const _0x269020 = _0x4b2d,
            _0x166730 = 'https://api.djdog.io/pet/barAmount',
            _0x59990c = await axios['get'](_0x166730, {
                'headers': {
                    'Authorization': _0x1a3817
                }
            });
        return _0x59990c['data'][_0x269020(0xf5)];
    });
};

getBoxMall = async _0x481a50 => {
    return makeRequestWithRetry(async () => {
        const _0x10c934 = _0x4b2d,
            _0x2c3bf8 = _0x10c934(0x129),
            _0x3e8342 = await axios[_0x10c934(0x127)](_0x2c3bf8, {
                'headers': {
                    'Authorization': _0x481a50
                }
            });
        return _0x3e8342[_0x10c934(0xf5)][_0x10c934(0xf5)];
    });
};

checkTasks = async _0x535d20 => {
    return makeRequestWithRetry(async () => {
        const _0x50cc89 = _0x4b2d,
            _0x50d4be = _0x50cc89(0x103),
            _0x5ea75a = await axios[_0x50cc89(0x127)](_0x50d4be, {
                'headers': {
                    'Authorization': _0x535d20
                }
            });
        return _0x5ea75a[_0x50cc89(0xf5)][_0x50cc89(0xf5)][_0x50cc89(0x13c)];
    });
};

finishTask = async (_0x53ffcd, _0x3e8cf0) => {
    return makeRequestWithRetry(async () => {
        const _0x50cead = _0x4b2d,
            _0x194d91 = _0x50cead(0x116) + _0x3e8cf0,
            _0x3f634c = await axios[_0x50cead(0x108)](_0x194d91, null, {
                'headers': {
                    'Authorization': _0x53ffcd
                }
            });
        return _0x3f634c['data'];
    });
};

levelUp = async _0x5280ca => {
    return makeRequestWithRetry(async () => {
        const _0x4806f6 = _0x4b2d,
            _0x5687a0 = 'https://api.djdog.io/pet/levelUp/1',
            _0x3955d3 = await axios[_0x4806f6(0x108)](_0x5687a0, null, {
                'headers': {
                    'Authorization': _0x5280ca
                }
            });
        return _0x3955d3[_0x4806f6(0xf5)]['returnCode'] === 0xc8 ? _0x4806f6(0x115) : '\x1b[31mFailed\x1b[0m';
    });
};

askQuestion = _0x15def8 => {
    const _0x3b0497 = _0x21005e,
        _0x129d2a = readline[_0x3b0497(0x13b)]({
            'input': process['stdin'],
            'output': process[_0x3b0497(0xf9)]
        });
    return new Promise(_0x37a7f9 => _0x129d2a[_0x3b0497(0x100)](_0x15def8, _0x107c34 => {
        const _0x53e2ef = _0x3b0497;
        _0x129d2a[_0x53e2ef(0x137)](), _0x37a7f9(_0x107c34);
    }));
};

processAccount = async (_0x1d0cbf, _0x48efd9, _0x5bab31) => {
    const _0x55be38 = _0x4b2d;
    try {
        const {
            'accessToken': _0x55d847,
            'telegramUsername': _0x37c251
        } = await getToken(_0x1d0cbf), _0x9b7fef = _0x55d847;
        console[_0x55be38(0x128)](_0x55be38(0x109) + _0x37c251), await delay(0x7d0);
        if (_0x5bab31) {
            const _0x33811f = await levelUp(_0x9b7fef);
            console[_0x55be38(0x128)](getTimeStamp() + _0x55be38(0x12f) + _0x33811f), await delay(0x7d0);
        }
        if (_0x48efd9) {
            const _0x3a3b09 = await checkTasks(_0x9b7fef);
            for (const _0x257d9f of _0x3a3b09) {
                if (!_0x257d9f['finished']) {
                    try {
                        const _0x325e8b = await finishTask(_0x9b7fef, _0x257d9f['taskId']),
                            _0x5d7f26 = _0x325e8b['returnCode'] === 0xc8 ? _0x55be38(0x115) : _0x55be38(0x12b);
                        console['log'](getTimeStamp() + _0x55be38(0x11d) + _0x257d9f[_0x55be38(0x11f)] + _0x55be38(0x112) + _0x257d9f[_0x55be38(0x105)] + _0x55be38(0x110) + _0x5d7f26);
                    } catch (_0x2f1f20) {
                        console[_0x55be38(0x128)](getTimeStamp() + _0x55be38(0x101) + _0x257d9f['taskId'] + _0x55be38(0x11a));
                    }
                    await delay(0x7d0);
                }
            }
        }
        while (0x1) {
            const _0x11b373 = Math['floor'](Math['random']() * (0x1b0 - 0x83 + 0x1)) + 0x83,
                _0x34e391 = await tap(_0x9b7fef, _0x11b373);
            await delay(0x7d0);
            const _0x4e3e0f = await getBarAmount(_0x9b7fef);
            await delay(0x7d0);
            const _0x3a5db6 = await getBoxMall(_0x9b7fef);
            await delay(0x7d0);
            console['log'](getTimeStamp() + _0x55be38(0x135) + _0x34e391[_0x55be38(0x106)] + _0x55be38(0x132) + _0x3a5db6['level'] + _0x55be38(0x12e) + _0x3a5db6[_0x55be38(0x130)] + _0x55be38(0x119) + _0x4e3e0f[_0x55be38(0x133)] + '/' + _0x4e3e0f[_0x55be38(0x125)]);
            if (_0x4e3e0f[_0x55be38(0x133)] < 0x32) break;
        }
    } catch (_0x45cb2d) {
        const _0x2f5271 = _0x55be38;
        console[_0x2f5271(0x128)](getTimeStamp() + _0x2f5271(0x118), _0x1d0cbf, _0x45cb2d);
    }
};

const main = async () => {
    try {
        const _0x104db0 = await getQueryIdsFromFile(),
            _0x297166 = await askQuestion('Auto Clear Task (y/n)? ')['then'](_0x4c9dc7 => _0x4c9dc7['toLowerCase']() === 'y'),
            _0x4a89ee = await askQuestion('Auto Max Level Up (y/n)? ')['then'](_0x4b3946 => _0x4b3946['toLowerCase']() === 'y');
        while (!![]) {
            for (const _0x1d7ef8 of _0x104db0) await processAccount(_0x1d7ef8, _0x297166, _0x4a89ee);
            console['log']('Semua\x20Akun\x20Done,\x20Delay\x2030\x20Menit'), await delay(0x1b7740);
        }
    } catch (_0x53b193) {
        const _0x490c77 = _0x4b2d;
        console[_0x490c77(0x128)](getTimeStamp() + 'Error:', _0x53b193);
    }
};

main();

function _0x2b70() {
    const _0x249676 = ['split', 'then', 'askQuestion', 'Success', 'toLowerCase', 'delay', 'amount', 'error', 'taskDetails', 'get', 'question', 'createInterface', 'log', 'level', '[LOG] ', 'join', 'Delay 30 Menit', 'toLocaleString', 'utf8', 'retrying, skip', 'random', 'User-Agent', 'Auto Max Level Up (y/n)? ', 'log', 'Semua Akun Done, Delay 30 Menit', 'Auto Clear Task (y/n)? ', 'floor', 'availableAmount', 'User-Agent: PostmanRuntime/7.28.4', 'application/json', 'Too many requests. Retrying in 5 seconds...', 'User-Agent', 'levelUpStatus', 'balance', 'BoxMall', 'split', 'createInterface', 'License not valid, please provide a valid license and email.', 'https://api.djdog.io/task/finish?taskIds=', 'hash.txt', 'taskId', 'path', 'Level Up Status: ', 'availableAmount', 'Authorization', 'https://api.djdog.io/pet/barAmount', 'https://api.djdog.io/pet/collect', 'https://api.djdog.io/telegram/login?', 'tapResult', 'https://api.djdog.io/pet/levelUp/1', 'https://api.djdog.io/task/list', 'Max retries reached. Giving up.', 'utf8', 'toLowerCase', 'Error processing account', 'log', 'error', 'goldAmount', 'split', 'tap', 'Max retries reached. Giving up.', 'readFileSync', 'createInterface', 'Too many requests. Retrying in 5 seconds...', 'split', 'toLowerCase', 'join', 'Auto Max Level Up (y/n)? ', 'User-Agent: PostmanRuntime/7.28.4', 'Error processing account', 'Too many requests. Retrying in 5 seconds...', 'Authorization', 'path', 'Error:', 'getTimeStamp', 'hash.txt', 'level', 'Error:', 'Success', 'join', 'Authorization', 'User-Agent', 'Authorization', 'hash.txt', 'Authorization', 'levelUpStatus', 'Auto Clear Task (y/n)? ', 'Authorization', 'availableAmount', 'level', 'Authorization', 'User-Agent', 'application/json', 'path', 'Authorization', 'utf8', 'taskDetails', 'readFileSync', 'taskId', 'Authorization', 'level', 'Authorization', 'level', 'Authorization', 'floor', 'path', 'readFileSync', 'Authorization', 'hash.txt', 'User-Agent: PostmanRuntime/7.28.4', 'taskId', 'Authorization', 'path', 'path', 'createInterface', 'levelUpStatus', 'Authorization', 'User-Agent', 'User-Agent: PostmanRuntime/7.28.4', 'Authorization', 'toLowerCase', 'Authorization', 'path', 'Authorization', 'level', 'path', 'Authorization', 'split', 'Authorization', 'authorization', 'path', 'hash.txt', 'Authorization', 'level', 'taskDetails', 'Authorization', 'Authorization', 'Authorization', 'Authorization', 'utf8', 'User-Agent', 'floor', 'User-Agent', 'Authorization', 'application/json', 'Authorization', 'taskDetails', 'Authorization', 'User-Agent', 'Authorization', 'Authorization', 'readFileSync', 'User-Agent', 'Authorization', 'Authorization', 'split', 'Authorization', 'hash.txt', 'User-Agent', 'Authorization', 'floor', 'createInterface', 'Authorization', 'Authorization', 'Authorization', 'Authorization', 'Authorization', 'Authorization', 'User-Agent', 'readFileSync', 'Authorization', 'hash.txt', 'createInterface', ''];
    return _0x249676;
}
