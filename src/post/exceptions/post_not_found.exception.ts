import { NotFoundException } from '@nestjs/common'

class PostNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Post id ${id} is not found`)
  }
}

export default PostNotFoundException;