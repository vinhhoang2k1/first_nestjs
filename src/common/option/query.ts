import { ApiQueryOptions } from '@nestjs/swagger';
interface QueryType {
  limit?: ApiQueryOptions;
  offset?: ApiQueryOptions
  imagePath?: ApiQueryOptions
}
export const ApiqueryDoc: QueryType = {
  limit: {
    name: 'limit',
    description: 'get limit page',
    type: 'string',
    required: false,
  },
  offset: {
    name: 'offset',
    description: 'get offset page',
    type: 'string',
    required: false,
  },
  imagePath: {
    name: 'imagePath',
    description: 'Get image from path',
    type: 'string',
    required: true,
  }
};
