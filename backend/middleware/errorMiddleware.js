const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// ==========================================
// ## 問題很可能出在下面這一行 ##
// ==========================================
// 這行程式碼的作用是，將 notFound 和 errorHandler 這兩個函式「公開」，
// 讓其他檔案（例如 server.js）可以透過 import 來使用它們。
export { notFound, errorHandler };