import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { events } from 'src/common/constant/event.constant';
import { ResponseAddEvent } from '../events/responseAdd.event';

@Injectable()
export class ResponseService {
  @OnEvent(events.RESPONSE_SUBMITTED)
  handleIfResponseIsCorrect(payload: ResponseAddEvent) {
    console.log('handleIfResponseIsCorrect', payload);
  }
}
