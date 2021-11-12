const responseError = (res, error) => {
    return res.status(401).json({error})
}

const ErrorLabel = {
    Unauthorised: "Unauthorised",
    UnvalidPassword: "Unvalid password!",
    UnvalidEmail: "Unvalid email!",
    NotFound: "Not found!",
    NotCreated: "Unable to create",
}

const responseSuccess = (res, jsonResult) => {
    return res.json(jsonResult)
}

module.exports = {
    ErrorLabel,
    responseError,
    responseSuccess,
}