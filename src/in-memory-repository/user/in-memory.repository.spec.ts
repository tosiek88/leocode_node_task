import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryUserRepository } from './in-memory.repository';

describe('RepositoryInMemoryService', () => {
  let service: InMemoryUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryUserRepository],
    }).compile();

    service = module.get<InMemoryUserRepository>(InMemoryUserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
