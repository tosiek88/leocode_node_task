import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryInMemoryService } from './repository-in-memory.service';

describe('RepositoryInMemoryService', () => {
  let service: RepositoryInMemoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepositoryInMemoryService],
    }).compile();

    service = module.get<RepositoryInMemoryService>(RepositoryInMemoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
