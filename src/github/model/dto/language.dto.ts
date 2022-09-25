import { ApiProperty } from '@nestjs/swagger';

export class ProgrammingLanguage {
  @ApiProperty({ example: 'JavaScript' })
  name: string;

  @ApiProperty({ example: 'javascript' })
  code: string;
}
