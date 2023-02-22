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

    expect(priceWithCommas(0)).toBe('USD$ 0');
    expect(priceWithCommas(100)).toBe('USD$ 100');
    expect(priceWithCommas(1000)).toBe('USD$ 1,000');
    expect(priceWithCommas(1000, NaN, 10)).toBe('USD$ 100');
    expect(priceWithCommas(1000, NaN, 34.5)).toBe('USD$ 29');
    expect(priceWithCommas(1000, NaN, "A")).toBe('USD$ 1,000');
    // expect(priceWithCommas(1000.524, 2)).toBe('USD$ 1,000.52'); // ???

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

    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(54024)).toBe('52.76 KB');
    expect(formatBytes(748691048)).toBe('714.01 MB');
    expect(formatBytes(94608991654987)).toBe('86.05 TB');

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
