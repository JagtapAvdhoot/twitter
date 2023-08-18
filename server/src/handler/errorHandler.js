
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;

    console.log('from error handler\n', err, '\nfrom error handler')

    // Send the error response
    res.status(statusCode).json({
        error: {
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
        },
    });
};


module.exports= errorHandler