import { ApiProperty } from '@nestjs/swagger';

export class Repo {
  @ApiProperty({
    type: String,
  })
  author: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    type: String,
  })
  programmingLanguage: string;

  @ApiProperty({
    type: Number,
  })
  stars: number;

  @ApiProperty({
    type: Number,
  })
  forks: number;

  @ApiProperty({
    type: Number,
  })
  starsInRange: number;
}
