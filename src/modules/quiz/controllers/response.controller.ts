import { EventEmitter2 } from '@nestjs/event-emitter';
import { ResponseAddEvent } from '../events/responseAdd.event';
import { events } from 'src/common/constant/event.constant';

export class ResponseController {
  constructor(private eventEmitter: EventEmitter2) {}

  async handleQuestionResponse() {
    console.log('This is inside the controller');

    const payload = new ResponseAddEvent();
    payload.userId = 1;
    payload.optionId = 33;

    this.eventEmitter.emit(events.RESPONSE_SUBMITTED, payload);

    return {
      message: 'Response taken',
    };
  }
}
