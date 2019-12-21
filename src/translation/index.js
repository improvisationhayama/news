const Polyglot = require('node-polyglot');
const template = require('./template');

const getConfig = () => {
    if (process.env.NODE_ENV === 'dev') {
        return {};
    } else {
        return {
            allowMissing: true,
            onMissingKey: () => {
                return 'Something went wrong';
            }
        };
    }
};

const polyglot = new Polyglot(getConfig());

module.exports = (key, lang = 'vi') => {
    if (lang) {
        polyglot.extend(template[lang]);
    } else {
        polyglot.extend(template['en']);
    }
    
    if (typeof key === 'string') {
        return polyglot.t(key);
    } else {
        return polyglot.t('something_went_wrong');
    }
};