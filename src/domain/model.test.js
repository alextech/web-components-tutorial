'use strict';

import {add} from "./model.js";

describe('Sample Karma test', () => {
    it('Should change title of panel', () => {
        assert.equal(true, true);

        assert.equal(add(2, 3), 5);
    });
});