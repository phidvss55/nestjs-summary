export class UpdateItemDto {
  public: boolean;
  comments: CreateCommentDto[];
}

export class CreateTagDto {
  content: string;
}

export class CreateItemDto {
  name: string;
  public: boolean;
  listing: CreateListingDto;
  tags: CreateTagDto[];
}

export class CreateCommentDto {
  content: string;
}

export class CreateListingDto {
  description: string;
}
