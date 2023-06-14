import { Injectable } from '@nestjs/common';
import ResumeParser from 'resume-parser';

@Injectable()
export class FileService {
  async parseFileToJson(file: any) {
    // ResumeParser.parseResumeFile(file.path, (data: any) => {
    //   resolve(data);
    // });
    console.log('file', ResumeParser);
    const resume = await ResumeParser.parseResume(file.path, '__DIR');
    console.log('resume', resume);
    // return new Promise((resolve, reject) => {
    //   ResumeParser.parseResumeFile(file.path, (data: any) => {
    //     console.log('data', data);
    //     resolve(data);
    //   });
    // });

    // return {
    //   originalname: file.originalname,
    //   filename: file.filename,
    // };
  }
}
