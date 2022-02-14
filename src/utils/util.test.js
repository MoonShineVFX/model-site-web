import util from './util';

const {
    priceWithCommas,
    renderWithoutValue,
    mappingTags,
    dateFormat,
    formatBytes,
    arrangeFormatAndRender,
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

    const resData = { 1: 'aaa' };

    expect(mappingTags([])).toEqual({});
    expect(mappingTags(reqData)).toEqual(resData);

});

it('dateFormat', () => {

    expect(dateFormat('2022-02-14')).toBe('2022/02/14 00:00');
    expect(dateFormat('2022-02-14 00:00')).toBe('2022/02/14 00:00');
    expect(dateFormat('2022-02-14T09:19:00')).toBe('2022/02/14 09:19');

});

it('formatBytes', () => {

    expect(formatBytes(1024)).toBe('1K');
    expect(formatBytes(54024)).toBe('52.76K');
    expect(formatBytes(748691048)).toBe('714.01M');
    expect(formatBytes(94608991654987)).toBe('86.05T');

});

it('arrangeFormatAndRender', () => {

    const reqData = [
        {
            id: 1,
            formatId: 11,
            formatName: 'aa',
            rendererId: 111,
            rendererName: 'aaa',
        },
    ];

    const resData = {
        11: {
            id: 1,
            name: 'aa',
            renders: [
                { rendererId: 111, rendererName: 'aaa' },
            ],
        },
    };

    expect(arrangeFormatAndRender([])).toEqual({});
    expect(arrangeFormatAndRender(reqData)).toEqual(resData);

});
