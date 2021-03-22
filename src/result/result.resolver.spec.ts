import { Test, TestingModule } from '@nestjs/testing';
import { ResultResolver } from './result.resolver';

describe('ResultResolver', () => {
  let resolver: ResultResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultResolver],
    }).compile();

    resolver = module.get<ResultResolver>(ResultResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
