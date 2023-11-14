// @ts-ignore
const _global: any = this || {};

function getTimeFactory(_window: any, _process: any, _date: any) {
    return () => {
        if (_window !== undefined && _window !== null) {

            // modern browsers
            return _window.performance.now();

        } else if (_process !== undefined && _process !== null) {

            // node
            const nanoseconds = _process.hrtime()[1];
            const milliseconds = nanoseconds / 1000000;
            return milliseconds;

        } else {

            // old browsers
            return new _date().getTime();

        }
    };
}

const getTime = getTimeFactory(_global.window, _global.process , Date);

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
    s4() + "-" + s4() + s4() + s4();
}

function getTimeDiference( start: number, end: number) {
    const diff = end - start;
    const formatted = diff.toFixed(2);
    return formatted;
}

export { getTimeFactory, getTime, getTimeDiference, guid };
