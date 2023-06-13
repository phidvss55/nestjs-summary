export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
    req.fileValidationError = 'Your files is not allowed';
    return callback(null, false);
  }
  callback(null, true);
};
