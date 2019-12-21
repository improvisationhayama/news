const jwt = require('jsonwebtoken');
const casbin = require('casbin');
const fs = require('fs');
const createError = require('http-errors');

const PUBLIC_KEY_PATH = process.env.PUBLIC_KEY_PATH;
const API_KEY = process.env.API_KEY;
const RBAC_MODEL = `${__dirname}/rules/model.conf`;
const RBAC_POLICY = `${__dirname}/rules/policy.conf`;

const decodeUserRole = (role) => {
    switch (role) {
    case 0:
        return 'super_admin';
    case 1:
        return 'operator';
    case 2: 
        return 'teacher';
    case 3:
        return 'student';
    case 4: 
        return 'coach';
    default:
        return 'trial';
    }
};

const verifyToken = (req, res, next) => {
    let token = req.signedCookies.token;
    let authType = 'jwt';
    
    if (!token && req.headers.authorization) {
        token = req.headers.authorization;
        if (token.slice(0, 5) === 'Basic') {
            token = token.replace('Basic ', '');
            authType = 'apiKey';
        } else {
            token = token.replace('Bearer ', '');
        }
    } else if (!token) {
        return res.status(401).json({error: 'Token is required'});
    }

    try {
        if (authType === 'apiKey') {
            if (token !== API_KEY) {
                throw createError(401, 'api_key_is_invalid');
            }

            res.locals.userRole = decodeUserRole(0);
        } else {
            const publicKey = fs.readFileSync(PUBLIC_KEY_PATH);
            const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
            
            res.locals.user = decoded;
            res.locals.userRole = decodeUserRole(decoded.role);
            res.locals.userToken = token;
        }

        next();
    } catch(error) {
        next();

        // res.status(401).json({error: error.message});
    }
};

exports.getEnforcer = () => {
    return casbin.newEnforcer(RBAC_MODEL, RBAC_POLICY);
};

exports.authorize = (role, sub, action) => {
    if (enforcer.enforce(role, sub, action)) {
        return true;
    }

    throw createError(403, 'access_denied');
};

exports.auth = (req, res, next) => {
    const ignorePath = [];
    if (ignorePath.indexOf(req.path) >= 0) {
        next();
    } else {
        verifyToken(req, res, next);
    }
};