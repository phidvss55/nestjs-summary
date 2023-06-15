import { Injectable } from '@nestjs/common';
import { CONVERTED_PATH } from '../../common/constants/common.constant';
import ResumeParser from '../../../@library/resume-parser/classes/resumeParser';

@Injectable()
export class FileService {
  async parsePathToJson(path: any) {
    const resume = new ResumeParser(path);

    // const res = await resume
    //   .parseToFile(CONVERTED_PATH)
    //   .then((file) => {
    //     console.log('Yay! ', file);
    //     return file;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    const res = await resume
      .parseToJSON()
      .then((file) => {
        console.log('Yay! ', file);
        return file;
      })
      .catch((error) => {
        console.error(error);
      });

    return {
      originalname: path,
      data: res,
    };
  }

  async parseFileToJson(file: any) {
    const resume = new ResumeParser(file);

    const res = await resume
      .parseToJSON()
      .then((data) => {
        console.log('Yay! ', data);
        return data;
      })
      .catch((error) => {
        console.error(error);
      });

    // const res = resume
    //   .parseToFile(CONVERTED_PATH)
    //   .then((file) => {
    //     console.log('Yay! ', file);
    //     return file;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    return {
      originalname: file.originalname,
      filename: file.filename,
      data: res,
    };
  }
}
