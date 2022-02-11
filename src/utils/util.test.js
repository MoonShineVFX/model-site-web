import util from './util';

const {
    serviceProxy,
    serviceServer,
    priceWithCommas,
    renderWithoutValue,
    mappingTags,
    dateFormat,
    formatBytes,
    arrangeFormatAndRender,
    redirectTo,
} = util;

it('priceWithCommas', () => {

    expect(priceWithCommas(0)).toBe('NT$ 0 元');
    expect(priceWithCommas(100)).toBe('NT$ 100 元');
    expect(priceWithCommas(1000)).toBe('NT$ 1,000 元');
    // expect(priceWithCommas(1000.524, 2)).toBe('NT$ 1,000.52 元'); // ???

});

it('renderWithoutValue', () => {

    expect(renderWithoutValue('')).toBe('--');
    expect(renderWithoutValue('test')).toBe('test');

});

it('mappingTags', () => {

    const reqData = [
        { id: 1, name: 'aaa' },
    ];

    const reqData1 = [
        { age: 1, gender: 'aaa' },
    ];

    const resData = {
        1: 'aaa',
    };

    expect(mappingTags([])).toEqual({});
    expect(mappingTags(reqData)).toEqual(resData);
    expect(mappingTags(reqData1)).toEqual(resData);

});
