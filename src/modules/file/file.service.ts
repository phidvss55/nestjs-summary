import { Injectable } from '@nestjs/common';
import ResumeParser from '../../../@library/resume-parser';
import { CONVERTED_PATH } from '../../../@library/resume-parser/utils/constants';

@Injectable()
export class FileService {
  async parseFileToJson(file: any) {
    const resume = new ResumeParser(file);

    // resume
    //   .parseToJSON()
    //   .then((data) => {
    //     console.log('Yay! ', data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    //Save to JSON File
    resume
      .parseToFile(CONVERTED_PATH)
      .then((file) => {
        console.log('Yay! ', file);
      })
      .catch((error) => {
        console.error(error);
      });

    return {
      originalname: file.originalname,
      filename: file.filename,
    };
  }
}
