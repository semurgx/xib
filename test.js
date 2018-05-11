const xib = require('.');
require('chai/register-should');

describe('xib', () => {
    describe('tagging string literal', () => {
        it('should add prefix and postfix', () => {
            xib.bold.cyan`a string`.should.equal('\x1b[1;36ma string\x1b[22;39m');
            xib.blue.cyanBackground`an another string`.should.equal('\x1b[34;46man another string\x1b[39;49m');
        });
    });

    describe('default calling', () => {
        it("shouldn't change given string", () => {
            xib`a string`.should.equal('a string');
            xib`an another string`.should.equal('an another string');
        });
    });

    describe('styling', () => {
        describe('reset', () => {
            it('should add corresponsing prefix', () => {
                xib.reset`a string`.should.equal('\x1b[0ma string');
            });
        });

        describe('bold', () => {
            it('should add corresponsing prefix and postfix', () => {
                xib.bold`a string`.should.equal('\x1b[1ma string\x1b[22m');
            });
        });

        describe('dim', () => {
            it('should add corresponsing prefix and postfix', () => {
                xib.dim`a string`.should.equal('\x1b[2ma string\x1b[22m');
            });
        });

        describe('italic', () => {
            it('should add corresponsing prefix and postfix', () => {
                xib.italic`a string`.should.equal('\x1b[3ma string\x1b[23m');
            });
        });

        describe('underline', () => {
            it('should add corresponsing prefix and postfix', () => {
                xib.underline`a string`.should.equal('\x1b[4ma string\x1b[24m');
            });
        });

        describe('blink', () => {
            it('should add corresponsing prefix and postfix', () => {
                xib.blink`a string`.should.equal('\x1b[5ma string\x1b[25m');
            });
        });

        describe('inverse', () => {
            it('should add corresponsing prefix and postfix', () => {
                xib.inverse`a string`.should.equal('\x1b[7ma string\x1b[27m');
            });
        });

        describe('hidden', () => {
            it('should add corresponsing prefix and postfix', () => {
                xib.hidden`a string`.should.equal('\x1b[8ma string\x1b[28m');
            });
        });

        describe('strikethrough', () => {
            it('should add corresponsing prefix and postfix', () => {
                xib.strikethrough`a string`.should.equal('\x1b[9ma string\x1b[29m');
            });
        });

        describe('color', () => {
            it('should add corresponsing prefix and postfix', () => {
                xib.black`a string`.should.equal('\x1b[30ma string\x1b[39m');
            });
        });

        describe('backgroundColor', () => {
            it('should add corresponsing prefix and postfix', () => {
                xib.yellowBackground`a string`.should.equal('\x1b[43ma string\x1b[49m');
            });
        });
    });

    describe('shallow calling', () => {
        it('should return a prefix', () => {
            xib.underline.blink.brightWhiteBackground().should.equal('\x1b[4;5;107m');
            xib.brightYellowBackground.gray.dim().should.equal('\x1b[2;90;103m');
        });
    });

    describe('caching', () => {
        it('should cache equal calling chains', () => {
            xib.white.should.equal(xib.white);
            xib.italic.brightMagentaBackground.should.equal(xib.italic.brightMagentaBackground);
            xib.bold.red.should.not.equal(xib.red.bold);
        });
    });

    describe('chaining', () => {
        it('should apply multiple styles', () => {
            xib.bold.inverse.brightMagenta.brightRedBackground`a string`.should.equal('\x1b[1;7;95;101ma string\x1b[22;27;39;49m')
            xib.dim.italic.black.whiteBackground`a string`.should.equal('\x1b[2;3;30;47ma string\x1b[22;23;39;49m');
        });

        it('should redefine style', () => {
            xib.yellow.brightRed`a string`.should.equal('\x1b[91ma string\x1b[39m');
            xib.whiteBackground.brightWhiteBackground`a string`.should.equal('\x1b[107ma string\x1b[49m');
        });

        describe('consecutive chaining', () => {
            it("shouldn't create new xib", () => {
                xib.red.should.equal(xib.red.red);
                xib.yellow.should.equal(xib.yellow.yellow.yellow);
            });
        });
    });
});
